import { getAvailableAvatar, handleStage } from "../services";
import { text } from "../text";
import { MatchState, isMatchSettings, MatchOpCode, isMatchState, isMatchJoinMetadata, MatchLoopParams } from "../types";
import { handleError } from "../utils";

export const matchInit: nkruntime.MatchInitFunction = (_ctx, logger, _nk, params) => {
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
    emptyTicks: 0,
  };

  return {
    state: initialState,
    // TODO: Set tickRate to 5 after development is done for improved UX. But for dev purposes 1 is more than enough.
    tickRate: 1, // 1 tick per second = 1 matchLoop func invocations per second.
    label: "StandardMatch",
  };
};

export const matchJoinAttempt: nkruntime.MatchJoinAttemptFunction = (_ctx, logger, _nk, _dispatcher, _tick, state, presence, metadata) => {
  logger.info("----------------- MATCH JOIN ATTEMPT -----------------");

  if (!isMatchState(state)) throw text.error.invalidState;
  if (!isMatchJoinMetadata(metadata)) throw handleError(text.error.invalidMetadata, logger, nkruntime.Codes.INVALID_ARGUMENT);

  // accept a user that has already joined
  const alreadyJoined = state.players[presence.userId];
  if (alreadyJoined) return { state, accept: false };

  // Accept new players if we are still waiting and until the required amount has been fulfilled
  const players = Object.values(state.players);
  const isAccepted = state.matchStage === "lobbyStage" && players.length < state.settings.players;

  const avatarId = getAvailableAvatar(state);

  if (!avatarId) throw handleError(text.error.notFound, logger, nkruntime.Codes.NOT_FOUND);

  if (isAccepted) {
    state.presences[presence.userId] = presence;
    state.players[presence.userId] = {
      userId: presence.userId,
      username: presence.username,
      avatarId,
      isConnected: true,
      isReady: false,
    };
  }

  return { state, accept: isAccepted };
};

export const matchJoin: nkruntime.MatchJoinFunction = (_ctx, logger, _nk, dispatcher, _tick, state, presences) => {
  logger.info("----------------- MATCH JOINED -----------------");
  if (!isMatchState(state)) throw text.error.invalidState;

  //TODO: Shuffle player order
  presences.forEach((presence) => {
    const player = state.players[presence.userId];
    if (player) {
      state.playerOrder.push(presence.userId);
    }
  });

  //TODO: Return list of users currently in their match
  dispatcher.broadcastMessage(MatchOpCode.PLAYER_JOINED, JSON.stringify(state.players));
  return { state };
};

export const matchLoop: nkruntime.MatchLoopFunction = (ctx, logger, nk, dispatcher, tick, state, messages) => {
  logger.info("----------------- MATCH LOOP -----------------");

  if (!isMatchState(state)) throw text.error.invalidState;

  const loopParams: MatchLoopParams = { ctx, logger, nk, dispatcher, tick, state, messages };

  //TODO: create proper empty tick handler
  // If we have no presences in the match according to the match state, increment the empty ticks count or reset once a player has joined
  if (!state.players) {
    state.emptyTicks++;
  } else {
    state.emptyTicks = 0;
  }
  // If the match has been empty for more than 500 ticks, end the match by returning null
  if (state.emptyTicks > 500) return null;

  handleStage[state.matchStage](loopParams);

  return { state };
};

export const matchTerminate: nkruntime.MatchTerminateFunction = (_ctx, logger, _nk, _dispatcher, _tick, state, _graceSeconds) => {
  logger.info("----------------- MATCH TERMINATE -----------------");
  return { state };
};

export const matchSignal: nkruntime.MatchSignalFunction = (_ctx, logger, _nk, _dispatcher, _tick, state) => {
  logger.info("----------------- MATCH SIGNAL -----------------");
  return { state };
};

export const matchLeave: nkruntime.MatchLeaveFunction = (_ctx, logger, _nk, _dispatcher, _tick, state, presences) => {
  logger.info("----------------- MATCH LEAVE -----------------");

  // Remove the player from match state
  presences.forEach(function (presence) {
    delete state.players[presence.userId];
  });

  return {
    state,
  };
};
