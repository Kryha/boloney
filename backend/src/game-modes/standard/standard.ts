import { DEFAULT_MATCH_SETTINGS, TICK_RATE } from "../../constants";
import {
  errors,
  getAvailableAvatar,
  handleError,
  handleInactiveMatch,
  updateEmptyTicks,
  createChatGroup,
  calcStageNumber,
  calcDrawRoundCounter,
  updatePlayersState,
  setLosersAsReady,
} from "../../services";
import { MatchState, isMatchSettings, isMatchJoinMetadata, MatchLoopParams } from "../../types";
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

    const stageNumber = calcStageNumber(params.dicePerPlayer * params.players, params.stageNumberDivisor);
    const drawRoundCounter = calcDrawRoundCounter(stageNumber, params.drawRoundOffset);

    const initialState: MatchState = {
      settings: params,
      playersReady: [],
      playerOrder: [],
      matchStage: "lobbyStage",
      players: {},
      presences: {},
      bids: {},
      ticksBeforeTimeOut: 0,
      timerHasStarted: false,
      emptyTicks: 0,
      leaderboard: [],
      round: 1,
      stageNumber,
      drawRoundCounter,
      turnActionStep: "pickAction",
      action: "Boloney",
      historyEvents: [],
      activePowerUp: undefined,
      rollBackAttempts: 0,
    };

    createChatGroup(nk, ctx, logger);

    return {
      state: initialState,
      // TODO: Set tickRate to 5 after development is done for improved UX. But for dev purposes 1 is more than enough.
      tickRate: TICK_RATE, // 1 tick per second = 1 matchLoop func invocations per second.
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
  metadataParam
) => {
  try {
    const metadata = JSON.parse(metadataParam.data);
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
        extraDice: 0,
        rngDiceCounter: metadata.hashChain.length,
        seed: metadata.seed,
        hashChain: metadata.hashChain,
        arePowerUpsDisabled: false,
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
    updatePlayersState(state, dispatcher);

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
