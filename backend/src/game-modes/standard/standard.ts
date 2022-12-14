import { DEFAULT_MATCH_SETTINGS } from "../../constants";
import {
  errors,
  getAvailableAvatar,
  handleError,
  handleInactiveMatch,
  hidePlayersData,
  setLosersAsReady,
  updateEmptyTicks,
  createChatGroup,
} from "../../services";
import { MatchState, isMatchSettings, MatchOpCode, isMatchJoinMetadata, MatchLoopParams, PlayerJoinedPayloadBackend } from "../../types";
import { handleStage } from "./stage-handlers";

// This gets called when enough players are in a pool
export const matchmakerMatched: nkruntime.MatchmakerMatchedFunction = (_context, logger, nk, matches) => {
  try {
    matches.forEach((match) => {
      const { userId, username } = match.presence;
      logger.info(`Matched user '${userId}' named '${username}'`);
    });

    const matchId = nk.matchCreate("standard", { ...DEFAULT_MATCH_SETTINGS, players: matches.length });
    return matchId;
  } catch (error) {
    throw handleError(error, logger);
  }
};

export const matchInit: nkruntime.MatchInitFunction<MatchState> = (ctx, logger, nk, params) => {
  try {
    if (!isMatchSettings(params)) throw errors.invalidPayload;

    //TODO: If match settings are not specified as param use the default ones
    const initialState: MatchState = {
      settings: params,
      playersReady: [],
      playerOrder: [],
      matchStage: "lobbyStage",
      players: {},
      presences: {},
      bids: {},
      emptyTicks: 0,
      leaderboard: [],
      round: 1,
    };

    createChatGroup(nk, ctx, logger);

    return {
      state: initialState,
      // TODO: Set tickRate to 5 after development is done for improved UX. But for dev purposes 1 is more than enough.
      tickRate: 1, // 1 tick per second = 1 matchLoop func invocations per second.
      label: "StandardMatch",
    };
  } catch (error) {
    throw handleError(error, logger);
  }
};

export const matchJoinAttempt: nkruntime.MatchJoinAttemptFunction<MatchState> = (
  _ctx,
  logger,
  _nk,
  _dispatcher,
  _tick,
  state,
  presence,
  metadata
) => {
  try {
    if (!isMatchJoinMetadata(metadata)) throw errors.invalidMetadata;

    // check whether the player previously left the match
    const playerReconnecting = state.players[presence.userId];
    if (playerReconnecting) {
      state.presences[presence.userId] = presence;
      return { state, accept: true };
    }

    // Accept new players if we are still waiting and until the required amount has been fulfilled
    const players = Object.values(state.players);
    const isAccepted = state.matchStage === "lobbyStage" && players.length < state.settings.players;

    if (isAccepted) {
      const avatarId = getAvailableAvatar(state);
      if (!avatarId) throw errors.notFound;

      state.presences[presence.userId] = presence;
      state.players[presence.userId] = {
        userId: presence.userId,
        username: presence.username,
        avatarId,
        powerUpIds: [],
        diceValue: [],
        diceAmount: state.settings.dicePerPlayer,
        powerUpsAmount: state.settings.initialPowerUpAmount,
        isConnected: true,
        isReady: false,
        hasInitialPowerUps: false,
        isActive: false,
        hasRolledDice: false,
        status: "playing",
        actionRole: undefined,
        isTarget: false,
      };
      state.playerOrder.push(presence.userId);
    }

    return { state, accept: isAccepted };
  } catch (error) {
    throw handleError(error, logger);
  }
};

// !don't do any operations related to state update in this function!
export const matchJoin: nkruntime.MatchJoinFunction<MatchState> = (_ctx, logger, _nk, dispatcher, _tick, state, _presences) => {
  try {
    const hiddenPlayers = hidePlayersData(state.players);

    Promise.all(
      Object.values(state.presences).map(async (presence) => {
        const player = state.players[presence.userId];
        const payload: PlayerJoinedPayloadBackend = {
          players: hiddenPlayers,
          playerOrder: state.playerOrder,
          matchStage: state.matchStage,
          powerUpIds: player.powerUpIds,
          matchSettings: state.settings,
          leaderboard: state.leaderboard,
          hasRolledDice: player.hasRolledDice,
          diceValue: player.diceValue,
          bids: state.bids,
          round: state.round,
        };
        dispatcher.broadcastMessage(MatchOpCode.PLAYER_JOINED, JSON.stringify(payload), [presence]);
      })
    );

    return { state };
  } catch (error) {
    throw handleError(error, logger);
  }
};

export const matchLoop: nkruntime.MatchLoopFunction<MatchState> = (ctx, logger, nk, dispatcher, tick, state, messages) => {
  try {
    const loopParams: MatchLoopParams = { ctx, logger, nk, dispatcher, tick, state, messages };

    setLosersAsReady(state);

    // End match if players are inactive
    updateEmptyTicks(state, messages);
    const isMatchInactive = handleInactiveMatch(state, dispatcher);
    if (isMatchInactive) return null;

    handleStage[state.matchStage](loopParams);

    if (state.matchStage === "terminateMatchStage") return null;
    return { state };
  } catch (error) {
    throw handleError(error, logger);
  }
};

/**
 * TODO: currently the match terminates after the creator leaves the end of match page
 * TODO: see if there is away to keep it alive while the other players are in the match
 */
export const matchTerminate: nkruntime.MatchTerminateFunction<MatchState> = (
  _ctx,
  _logger,
  _nk,
  _dispatcher,
  _tick,
  state,
  _graceSeconds
) => {
  return { state };
};

export const matchSignal: nkruntime.MatchSignalFunction<MatchState> = (_ctx, _logger, _nk, _dispatcher, _tick, state) => {
  return { state };
};

export const matchLeave: nkruntime.MatchLeaveFunction<MatchState> = (_ctx, _logger, _nk, _dispatcher, _tick, state, _presences) => {
  return { state };
};
