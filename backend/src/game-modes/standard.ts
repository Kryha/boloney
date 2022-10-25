import { text } from "../text";
import { MatchState, MatchSettings, isMatchSettings, OpCode, PlayerState, isMatchState, PowerupType, isLobbyStage } from "../types";
import { DEFAULT_MATCH_SETTINGS, handleError } from "../utils";

/**
 * Using isMatchState predicate to check for state type in each hook will make nakama env to throw,
 * so apparently we can't use the predicate in these hooks
 */

export const matchInit: nkruntime.MatchInitFunction = (_ctx, logger, _nk, params) => {
  logger.info("----------------- MATCH INITIALIZED -----------------");

  if (!isMatchSettings(params)) throw handleError(text.error.invalidPayload, logger, nkruntime.Codes.INVALID_ARGUMENT);

  const initialState: MatchState = {
    settings: DEFAULT_MATCH_SETTINGS,
    players: [],
    playerCount: 0,
    phaseReady: [],
    playerOrder: [],
    matchPhase: "LobbyStage",
    emptyTicks: 0,
  };

  logger.info("----------------- STATE -----------------");
  logger.debug("Initial state: ", initialState);

  return {
    state: initialState,
    // TODO: Set tickRate to 5 after development is done for improved UX. But for dev purposes 1 is more than enough.
    tickRate: 1, // 1 tick per second = 1 matchLoop func invocations per second.
    label: "StandardGame",
  };
};

export const matchJoinAttempt: nkruntime.MatchJoinAttemptFunction = (
  _ctx,
  logger,
  _nk,
  _dispatcher,
  _tick,
  state,
  _presence,
  _metadata
) => {
  logger.info("----------------- MATCH JOIN ATTEMPT -----------------");

  // A custom match starts right after creating it, so it needs to check manually if the room is full/joinable.
  const canPlayerJoin = Object.keys(state.presences).length < state.players;

  return { state, accept: canPlayerJoin };
};

export const matchJoin: nkruntime.MatchJoinFunction = (_ctx, logger, _nk, _dispatcher, _tick, state, presences) => {
  logger.info("----------------- MATCH JOINED -----------------");

  presences.forEach((p) => {
    state.presences[p.sessionId] = p;
  });

  return {
    state,
  };
};

export const matchLoop: nkruntime.MatchLoopFunction = (_ctx, logger, _nk, dispatcher, _tick, state, messages) => {
  logger.info("----------------- MATCH LOOP -----------------");

  // If we have no presences in the match according to the match state, increment the empty ticks count
  if (!state.players) {
    state.emptyTicks++;
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

  presences.forEach((p) => {
    delete state.presences?.[p.sessionId];
  });

  return {
    state,
  };
};
