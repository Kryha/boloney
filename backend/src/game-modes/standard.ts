import { text } from "../text";
import { MatchState, MatchSettings, isMatchSettings, MatchOpCode, OpCode, PlayerState, isMatchState, isMatchJoinMetadata } from "../types";
import { DEFAULT_MATCH_SETTINGS, handleError } from "../utils";

export const matchInit: nkruntime.MatchInitFunction = (_ctx, logger, _nk, params) => {
  logger.info("----------------- MATCH INITIALIZED -----------------");

  if (!isMatchSettings(params)) throw handleError(text.error.invalidPayload, logger, nkruntime.Codes.INVALID_ARGUMENT);

  //TODO: If match settings are not et through parameters set the default settings
  const initialState: MatchState = {
    settings: params,
    playerCount: 0,
    phaseReady: [],
    playerOrder: [],
    matchStage: "WaitingForPlayers",
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

  logger.debug("METADATA: ", metadata.username);

  if (!isMatchState(state)) throw text.error.invalidState;
  if (!isMatchJoinMetadata(metadata)) throw handleError(text.error.invalidMetadata, logger, nkruntime.Codes.INVALID_ARGUMENT);

  const playersArr = Object.values(state.players);

  // accept a user that has already joined
  const alreadyJoined = playersArr.find((player) => player.username === metadata.username);
  if (alreadyJoined) return { state, accept: true };

  // Accept new players if we are still waiting and until the required amount has been fulfilled
  const accept = state.phase === "waitingForPlayers" && playersArr.length < state.settings.players;

  if (accept) {
    // Reserve the spot in the match
    state.presences[presence.userId] = presence;
    // TODO: create a function to correctly generate player's attributes
    state.players[presence.userId] = { ...metadata, color: "", avatarName: "", isConnected: true, isReady: false };
  }

  return { state, accept };
};

export const matchJoin: nkruntime.MatchJoinFunction = (_ctx, logger, _nk, _dispatcher, _tick, state, _presences) => {
  logger.info("----------------- MATCH JOINED -----------------");

  if (!isMatchState(state)) throw text.error.invalidState;

  return { state };
};

// TODO: improve flow
// TODO: remove debug logs after improving flow
export const matchLoop: nkruntime.MatchLoopFunction = (_ctx, logger, _nk, dispatcher, _tick, state, messages) => {
  logger.info("----------------- MATCH LOOP -----------------");

  logger.debug("STATE IN LOOP:", state);

  if (!isMatchState(state)) throw text.error.invalidState;

  messages.forEach((message) => {
    logger.debug("------ MESSAGE ------");
    logger.debug(JSON.stringify(message));

    const currentPlayer = state.players[message.sender.userId];

    logger.debug("CURRENT PLAYER:", currentPlayer);

    if (!currentPlayer) throw handleError(text.error.notFound, logger, nkruntime.Codes.NOT_FOUND);

    // If the message is a "ready" message, update the player's isReady state and broadcast it to other players
    if (message.opCode === MatchOpCode.READY) {
      logger.debug(`${message.sender.username} IS READY!`);
      state.players[message.sender.userId].isReady = true;
      dispatcher.broadcastMessage(MatchOpCode.READY, JSON.stringify({ userId: message.sender.userId }));

      const playersArr = Object.values(state.players);

      let allReady = true;
      playersArr.forEach((player) => {
        if (!player.isReady) allReady = false;
      });

      // If all players are ready, transition to InProgress state and broadcast the match starting event
      if (allReady && playersArr.length === state.settings.players) {
        state.phase = "inProgress";
        logger.debug("AND WE ARE LIVE!");
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
  //TODO: Proper error
  if (!isMatchState(state)) throw "Match state is invalid";

  switch (state.matchPhase) {
    case "LobbyStage": {
      messages.forEach((message: nkruntime.MatchMessage) => {
        const payload = "";
        if (isLobbyStage(payload)) {
          state.phaseReady.push(message.sender.userId);
        }

        if (state.phaseReady.length === state.playerCount) {
          state.matchPhase = "GetPowerUpStage";
          dispatcher.broadcastMessage(OpCode.StageTransition);
        }
      });
      break;
    }
    case "GetPowerUpStage": {
      break;
    }
    case "RollDiceStage": {
      break;
    }
    case "PlayerTurnLoopStage": {
      break;
    }
    case "RoundSummaryStage": {
      break;
    }
    case "EndOfMatchStage": {
      break;
    }
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
