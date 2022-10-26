import { handleError, pickAvatarColor, pickAvatarName } from "../utils";
import { text } from "../text";
import { MatchState, isMatchSettings, MatchOpCode, isMatchState, isMatchJoinMetadata, AVATAR_COLORS, AVATAR_NAMES } from "../types";

export const matchInit: nkruntime.MatchInitFunction = (_ctx, logger, _nk, params) => {
  logger.info("----------------- MATCH INITIALIZED -----------------");

  if (!isMatchSettings(params)) throw handleError(text.error.invalidPayload, logger, nkruntime.Codes.INVALID_ARGUMENT);

  const initialState: MatchState = {
    players: {},
    presences: {},
    phase: "waitingForPlayers",
    emptyTicks: 0,
    settings: params,
    availableAvatarColors: AVATAR_COLORS,
    availableAvatarNames: AVATAR_NAMES,
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

  logger.debug("METADATA: ", metadata.username);

  if (!isMatchState(state)) throw text.error.invalidState;
  if (!isMatchJoinMetadata(metadata)) throw handleError(text.error.invalidMetadata, logger, nkruntime.Codes.INVALID_ARGUMENT);

  // accept a user that has already joined
  const alreadyJoined = state.players[presence.userId];
  if (alreadyJoined) return { state, accept: true };

  // Accept new players if we are still waiting and until the required amount has been fulfilled
  const playersArr = Object.values(state.players);
  const accept = state.phase === "waitingForPlayers" && playersArr.length < state.settings.players;

  if (accept) {
    const [color, updatedColors] = pickAvatarColor(state.availableAvatarColors);
    if (!color) throw text.error.internal;
    const [avatarName, updatedNames] = pickAvatarName(state.availableAvatarNames);
    if (!avatarName) throw text.error.internal;

    state.presences[presence.userId] = presence;
    state.players[presence.userId] = { ...metadata, color, avatarName, isConnected: true, isReady: false };
    state.availableAvatarColors = updatedColors;
    state.availableAvatarNames = updatedNames;
  }

  return { state, accept };
};

export const matchJoin: nkruntime.MatchJoinFunction = (_ctx, logger, _nk, dispatcher, _tick, state, _presences) => {
  logger.info("----------------- MATCH JOINED -----------------");

  if (!isMatchState(state)) throw text.error.invalidState;

  dispatcher.broadcastMessage(MatchOpCode.PLAYER_JOINED, JSON.stringify(state.players));

  return { state };
};

export const matchLoop: nkruntime.MatchLoopFunction = (_ctx, logger, _nk, dispatcher, _tick, state, messages) => {
  logger.info("----------------- MATCH LOOP -----------------");

  if (!isMatchState(state)) throw text.error.invalidState;

  messages.forEach((message) => {
    const currentPlayer = state.players[message.sender.userId];

    if (!currentPlayer) throw handleError(text.error.notFound, logger, nkruntime.Codes.NOT_FOUND);

    // TODO: use switch statement
    // If the message is a "ready" message, update the player's isReady state and broadcast it to other players
    if (message.opCode === MatchOpCode.READY) {
      state.players[message.sender.userId].isReady = true;
      dispatcher.broadcastMessage(MatchOpCode.READY, JSON.stringify(state.players));

      const playersArr = Object.values(state.players);

      const allReady = playersArr.reduce((prevReady, player) => prevReady && player.isReady, true);

      // If all players are ready, transition to InProgress state and broadcast the match starting event
      if (allReady && playersArr.length === state.settings.players) {
        state.phase = "inProgress";
        dispatcher.broadcastMessage(MatchOpCode.MATCH_START);
      }
    }
  });

  // If we have no presences in the match according to the match state, increment the empty ticks count or reset once a player has joined
  if (!state.players) {
    state.emptyTicks++;
  } else {
    state.emptyTicks = 0;
  }

  // If the match has been empty for more than 500 ticks, end the match by returning null
  if (state.emptyTicks > 500) return null;

  return {
    state,
  };
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
