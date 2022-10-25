import { text } from "../text";
import { MatchState, isMatchSettings, MatchOpCode, isMatchState, isMatchJoinMetadata } from "../types";
import { handleError } from "../utils";

export const matchInit: nkruntime.MatchInitFunction = (_ctx, logger, _nk, params) => {
  logger.info("----------------- MATCH INITIALIZED -----------------");

  if (!isMatchSettings(params)) throw handleError(text.error.invalidPayload, logger, nkruntime.Codes.INVALID_ARGUMENT);

  //TODO: If match settings are not et through parameters set the default settings
  const initialState: MatchState = {
    settings: params,
    stageReady: [],
    playerOrder: [],
    matchStage: "WaitingForPlayers",
    players: {},
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

  const playersArr = Object.values(state.players);

  // accept a user that has already joined
  const alreadyJoined = playersArr.find((player) => player.presence.username === metadata.username);
  if (alreadyJoined) return { state, accept: true };

  // Accept new players if we are still waiting and until the required amount has been fulfilled
  const accept = state.matchStage === "WaitingForPlayers" && playersArr.length < state.settings.players;

  if (accept) {
    // TODO: create a function to correctly generate player's attributes
    state.players[presence.userId] = { presence: presence, color: "", avatarName: "", isConnected: true, isReady: false };
  }

  return { state, accept };
};

export const matchJoin: nkruntime.MatchJoinFunction = (_ctx, logger, _nk, dispatcher, _tick, state, presences) => {
  logger.info("----------------- MATCH JOINED -----------------");
  if (!isMatchState(state)) throw text.error.invalidState;

  //QUESTION: how do we define the order of the players?
  presences.forEach((presence) => {
    const player = state.players[presence.userId];
    if (player) {
      state.playerOrder.push(presence.userId);
    }
  });
  //QUESTION: How do we communicate with the client for update messages
  //TODO: Return list of users currently in their match
  dispatcher.broadcastMessage(MatchOpCode.PlayerReady, JSON.stringify({ players: [{}] }));
  return { state };
};

// TODO: improve flow
// TODO: remove debug logs after improving flow
export const matchLoop: nkruntime.MatchLoopFunction = (_ctx, logger, _nk, dispatcher, _tick, state, messages) => {
  logger.info("----------------- MATCH LOOP -----------------");

  // If we have no presences in the match according to the match state, increment the empty ticks count or reset once a player has joined
  if (!state.players) {
    state.emptyTicks++;
  } else {
    state.emptyTicks = 0;
  }
  if (!isMatchState(state)) throw text.error.invalidState;

  messages.forEach((message) => {
    const currentPlayer = state.players[message.sender.userId];

    if (!currentPlayer) throw handleError(text.error.notFound, logger, nkruntime.Codes.NOT_FOUND);

    switch (state.matchStage) {
      case "WaitingForPlayers": {
        const playersArr = Object.values(state.players);
        if (playersArr.length === state.settings.players) {
          state.matchStage = "WaitingForPlayersReady";
          dispatcher.broadcastMessage(MatchOpCode.StageTransition, JSON.stringify({ matchStage: "WaitingForPlayersReady" }));
        }
        break;
      }
      case "WaitingForPlayersReady": {
        if (message.opCode === 2) {
          currentPlayer.isReady = true;
        }

        const playersArr = Object.values(state.players);

        let allReady = true;
        playersArr.forEach((player) => {
          if (!player.isReady) allReady = false;
        });

        // If all players are ready, transition to InProgress state and broadcast the match starting event
        if (allReady && playersArr.length === state.settings.players) {
          state.matchStage = "GetPowerUpStage";
          dispatcher.broadcastMessage(MatchOpCode.StageTransition, JSON.stringify({ matchStage: "GetPowerUpStage" }));
        }

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
  });
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
