import { MatchOpCode, MatchPhase, handleError } from "../utils";
import { text } from "../text";
import { MatchState, isMatchSettings } from "../types";

/**
 * Using isMatchState predicate to check for state type in each hook will make nakama env to throw,
 * so apparently we can't use the predicate in these hooks
 */

export const matchInit: nkruntime.MatchInitFunction = (_ctx, logger, _nk, params) => {
  logger.info("----------------- MATCH INITIALIZED -----------------");

  if (!isMatchSettings(params)) throw handleError(text.error.invalidPayload, logger, nkruntime.Codes.INVALID_ARGUMENT);

  const initialState: MatchState = {
    players: {},
    phase: MatchPhase.WaitingForPlayers,
    settings: {
      requiredPlayerCount: params.requiredPlayerCount,
      dicePerPlayer: params.dicePerPlayer,
      powerupsPerPlayer: params.powerupsPerPlayer,
      availablePowerups: params.availablePowerups,
      isUsingFakeCredits: params.isUsingFakeCredits,
    },
    emptyTicks: 0,
  };

  return {
    state: initialState,
    // TODO: Set tickRate to 5 after development is done for improved UX. But for dev purposes 1 is more than enough.
    tickRate: 1, // 1 tick per second = 1 matchLoop func invocations per second.
    label: "StandardMatch",
  };
};

export const matchJoinAttempt: nkruntime.MatchJoinAttemptFunction = (_ctx, logger, _nk, _dispatcher, _tick, state, presence, _metadata) => {
  logger.info("----------------- MATCH JOIN ATTEMPT -----------------");

  // Accept new players if we are still waiting and until the required amount has been fulfilled
  const accept = state.phase === MatchPhase.WaitingForPlayers && Object.keys(state.players).length < state.settings.requiredPlayerCount;

  // Reserve the spot in the match
  state.players[presence.userId] = { presence: null, isReady: false };

  return {
    state,
    accept,
  };
};

export const matchJoin: nkruntime.MatchJoinFunction = (_ctx, logger, _nk, _dispatcher, _tick, state, presences) => {
  logger.info("----------------- MATCH JOINED -----------------");

  // Populate the presence property for each player that joined
  presences.forEach((presence) => {
    state.players[presence.userId].presence = presence;
  });

  return {
    state,
  };
};

export const matchLoop: nkruntime.MatchLoopFunction = (_ctx, logger, _nk, dispatcher, _tick, state, messages) => {
  logger.info("----------------- MATCH LOOP -----------------");

  messages.forEach((message) => {
    // TODO: This is the only part of the PR that is not working. Messages don't get picked up on so we can't communicate. Already asked the Heroic Forum....
    logger.debug("------ MESSAGE ------");
    logger.debug(JSON.stringify(message));

    // If the message is a Ready message, update the player's isReady status and broadcast it to other players
    if (message.opCode === MatchOpCode.READY) {
      logger.debug(`${message.sender.username} IS READY!`);
      state.players[message.sender.userId].isReady = true;
      dispatcher.broadcastMessage(MatchOpCode.READY, JSON.stringify({ userId: message.sender.userId }));

      // Check to see if all players are now ready (could be done in a one-liner but that's not readable)
      let allReady = true;
      Object.keys(state.players).forEach((userId) => {
        if (!state.players[userId].isReady) {
          allReady = false;
        }
      });

      // If all players are ready, transition to InProgress state and broadcast the match starting event
      if (allReady && Object.keys(state.players).length === state.settings.requiredPlayerCount) {
        state.phase = MatchPhase.InProgress;
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
