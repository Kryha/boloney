import {
  getAvailableAvatar,
  handleInactiveMatch,
  handlePlayerReconnect,
  handleStage,
  updateEmptyTicks,
  setLosersAsReady,
} from "../services";
import { text } from "../text";
import { MatchState, isMatchSettings, MatchOpCode, isMatchJoinMetadata, MatchLoopParams, PlayerJoinedPayload } from "../types";
import { handleError, hidePlayersData } from "../utils";

export const matchInit: nkruntime.MatchInitFunction<MatchState> = (_ctx, logger, _nk, params) => {
  logger.info("----------------- MATCH INITIALIZED -----------------");

  if (!isMatchSettings(params)) throw handleError(text.error.invalidPayload, logger, nkruntime.Codes.INVALID_ARGUMENT);

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
  };

  return {
    state: initialState,
    // TODO: Set tickRate to 5 after development is done for improved UX. But for dev purposes 1 is more than enough.
    tickRate: 1, // 1 tick per second = 1 matchLoop func invocations per second.
    label: "StandardMatch",
  };
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
  logger.info("----------------- MATCH JOIN ATTEMPT -----------------");

  if (!isMatchJoinMetadata(metadata)) throw handleError(text.error.invalidMetadata, logger, nkruntime.Codes.INVALID_ARGUMENT);

  // check whether the player previously left the match
  const playerReconnecting = state.players[presence.userId];
  if (playerReconnecting) {
    state = handlePlayerReconnect(state, presence, logger);
    return { state, accept: true };
  }

  // Accept new players if we are still waiting and until the required amount has been fulfilled
  const players = Object.values(state.players);
  const isAccepted = state.matchStage === "lobbyStage" && players.length < state.settings.players;

  if (isAccepted) {
    const avatarId = getAvailableAvatar(state);
    if (!avatarId) throw handleError(text.error.notFound, logger, nkruntime.Codes.NOT_FOUND);

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
};

// !don't do any operations related to state update in this function!
export const matchJoin: nkruntime.MatchJoinFunction<MatchState> = (_ctx, logger, _nk, dispatcher, _tick, state, _presences) => {
  logger.info("----------------- MATCH JOINED -----------------");

  const players = hidePlayersData(state.players);
  const payload: PlayerJoinedPayload = { players, playerOrder: state.playerOrder };
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_JOINED, JSON.stringify(payload));

  return { state };
};

export const matchLoop: nkruntime.MatchLoopFunction<MatchState> = (ctx, logger, nk, dispatcher, tick, state, messages) => {
  logger.info("----------------- MATCH LOOP -----------------");

  const loopParams: MatchLoopParams = { ctx, logger, nk, dispatcher, tick, state, messages };

  setLosersAsReady(state);

  // End match if players are inactive
  updateEmptyTicks(state, messages);
  const isMatchInactive = handleInactiveMatch(state, dispatcher);
  if (isMatchInactive) return null;

  handleStage[state.matchStage](loopParams);

  if (state.matchStage === "terminateMatchStage") return null;
  return { state };
};

export const matchTerminate: nkruntime.MatchTerminateFunction<MatchState> = (
  _ctx,
  logger,
  _nk,
  _dispatcher,
  _tick,
  state,
  _graceSeconds
) => {
  logger.info("----------------- MATCH TERMINATE -----------------");
  return { state };
};

export const matchSignal: nkruntime.MatchSignalFunction<MatchState> = (_ctx, logger, _nk, _dispatcher, _tick, state) => {
  logger.info("----------------- MATCH SIGNAL -----------------");
  return { state };
};

export const matchLeave: nkruntime.MatchLeaveFunction<MatchState> = (_ctx, logger, _nk, _dispatcher, _tick, state, presences) => {
  logger.info("----------------- MATCH LEAVE -----------------");
  logger.info("Players left: ", presences);
  return {
    state,
  };
};
