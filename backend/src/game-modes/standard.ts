import { canTransitionStage, getAvailableAvatar, getMessageSender } from "../services/match";
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

  const playersArr = Object.values(state.players);
  // accept a user that has already joined
  const alreadyJoined = state.players[presence.userId];
  if (alreadyJoined) return { state, accept: true };

  // Accept new players if we are still waiting and until the required amount has been fulfilled
  const accept = state.matchStage === "lobbyStage" && playersArr.length < state.settings.players;

  if (accept) {
    state.presences[presence.userId] = presence;
    state.players[presence.userId] = {
      userId: presence.userId,
      username: presence.username,
      avatarId: getAvailableAvatar(state),
      isConnected: true,
      isReady: false,
    };
  }

  return { state, accept };
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
  dispatcher.broadcastMessage(MatchOpCode.PlayerReady, JSON.stringify({ players: [{}] }));
  return { state };
};

// TODO: improve flow
// TODO: remove debug logs after improving flow
export const matchLoop: nkruntime.MatchLoopFunction = (_ctx, logger, nk, dispatcher, _tick, state, messages) => {
  logger.info("----------------- MATCH LOOP -----------------");

  if (!isMatchState(state)) throw text.error.invalidState;

  //TODO: create proper empty tick handler
  // If we have no presences in the match according to the match state, increment the empty ticks count or reset once a player has joined
  if (!state.players) {
    state.emptyTicks++;
  } else {
    state.emptyTicks = 0;
  }
  // If the match has been empty for more than 500 ticks, end the match by returning null
  if (state.emptyTicks > 500) return null;

  switch (state.matchStage) {
    case "lobbyStage": {
      logger.debug("-----LobbyStage-----");
      messages.forEach((message) => {
        const messageSender = getMessageSender(state, message, logger);

        if (message.opCode === 2) {
          messageSender.isReady = true;
          state.stageReady.push(messageSender.userId);
        }
      });
      // If all players are ready, transition to InProgress state and broadcast the match starting event
      if (canTransitionStage(state, "getPowerUpStage")) {
        dispatcher.broadcastMessage(MatchOpCode.StageTransition, JSON.stringify({ matchStage: "GetPowerUpStage" }));
      }

      break;
    }
    case "getPowerUpStage": {
      logger.debug("-----GetPowerupStage-----");
      messages.forEach((message) => {
        const messageSender = getMessageSender(state, message, logger);

        if (message.opCode == MatchOpCode.PlayerReady) {
          state.stageReady.push(messageSender.userId);
        }
      });

      if (canTransitionStage(state, "rollDiceStage")) {
        //TODO: sending a message with proper payload
        dispatcher.broadcastMessage(MatchOpCode.StageTransition, JSON.stringify({ matchStage: "RoundSummaryStage" }));
      }
      break;
    }
    case "rollDiceStage": {
      logger.debug("-----RollDiceStage-----");
      messages.forEach((message) => {
        const messageSender = getMessageSender(state, message, logger);

        if (message.opCode == MatchOpCode.RollDice) {
          state.stageReady.push(messageSender.userId);
        }
      });

      if (canTransitionStage(state, "playerTurnLoopStage")) {
        //TODO: sending a message with proper payload
        dispatcher.broadcastMessage(MatchOpCode.StageTransition, JSON.stringify({ matchStage: "RollDiceStage" }));
      }
      break;
    }
    case "playerTurnLoopStage": {
      logger.debug("-----PlayerTurnLoopStage-----");
      messages.forEach((message) => {
        const messageSender = getMessageSender(state, message, logger);

        if (message.opCode == MatchOpCode.RollDice) {
          state.stageReady.push(messageSender.userId);
        }
      });

      if (canTransitionStage(state, "roundSummaryStage")) {
        //TODO: sending a message with proper payload
        dispatcher.broadcastMessage(MatchOpCode.StageTransition, JSON.stringify({ matchStage: "PlayerTurnLoopStage" }));
      }
      break;
    }
    case "roundSummaryStage": {
      logger.debug("-----RoundSummaryStage-----");
      messages.forEach((message) => {
        const messageSender = getMessageSender(state, message, logger);

        if (message.opCode == MatchOpCode.RollDice) {
          state.stageReady.push(messageSender.userId);
        }
      });

      if (canTransitionStage(state, "endOfMatchStage")) {
        //TODO: sending a message with proper payload
        dispatcher.broadcastMessage(MatchOpCode.StageTransition, JSON.stringify({ matchStage: "RoundSummaryStage" }));
      }
      break;
    }
    case "endOfMatchStage": {
      logger.debug("-----EndOfMatchStage-----");
      messages.forEach((message) => {
        const messageSender = getMessageSender(state, message, logger);

        if (message.opCode == MatchOpCode.RollDice) {
          state.stageReady.push(messageSender.userId);
        }
      });

      dispatcher.broadcastMessage(MatchOpCode.StageTransition, JSON.stringify({ matchStage: "EndOfMatchStage" }));
      break;
    }
  }

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
