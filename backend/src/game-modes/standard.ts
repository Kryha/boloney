import { PowerupType } from "../interfaces/game";
import { MatchPhase, MatchState } from "../interfaces/match";
import { MatchOpCode } from "../utils";

export const matchInit: nkruntime.MatchInitFunction = (_ctx, logger, _nk, params) => {
  logger.info("----------------- MATCH INITIALIZED -----------------");

  const initialState: MatchState = {
    settings: {
      requiredPlayerCount: Number(params.players),
      dicePerPlayer: Number(params.dicePerPlayer),
      powerupsPerPlayer: Number(params.powerupsPerPlayer),
      availablePowerups: [params.availablePowerups] as PowerupType[],
      isUsingFakeCredits: !!+params.isUsingFakeCredits,
    },
    players: {},
    phase: MatchPhase.WaitingForPlayers,
    emptyTicks: 0,
  };

  logger.info("----------------- STATE -----------------");
  logger.debug(JSON.stringify(initialState));

  return {
    state: initialState,
    tickRate: 1, // 1 tick per second = 1 matchLoop func invocations per second.
    // TODO: Set tickRate to 5 after development is done for improved UX. But for dev purposes 1 is more than enough.
    label: "StandardMatch",
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
  _metadata: { [key: string]: any } // TODO: define and handle types with Zod
) => {
  logger.info("----------------- MATCH JOIN ATTEMPT -----------------");

  // A custom match starts right after creating it, so it needs to check manually if the room is full/joinable.
  const canPlayerJoin = state.presences && Object.keys(state.presences).length < state.players;

  return { state, accept: canPlayerJoin };
};

export const matchJoin: nkruntime.MatchJoinFunction = (_ctx, logger, _nk, _dispatcher, _tick, state, presences) => {
  logger.info("----------------- MATCH JOINED -----------------");

  presences.forEach((p) => {
    if (state.presences) state.presences[p.sessionId] = p;
  });

  return {
    state,
  };
};

export const matchLoop: nkruntime.MatchLoopFunction = (_ctx, logger, _nk, dispatcher, _tick, state, messages) => {
  logger.info("----------------- MATCH LOOP -----------------");
  logger.info(`PRESENCE COUNT: ${String(Object.keys(state.presences).length)}`);

  messages.forEach((message) => {
    logger.debug("------ MESSAGE ------");
    logger.debug(JSON.stringify(message));

    // If the message is a Ready message, update the player's isReady status and broadcast it to other players
    if (message.opCode === MatchOpCode.READY) {
      state.players[message.sender.userId].isReady = true;
      dispatcher.broadcastMessage(MatchOpCode.READY, JSON.stringify({ userId: message.sender.userId }));

      // Check to see if all players are now ready
      let allReady = true;
      Object.keys(state.players).forEach((userId) => {
        if (!state.players[userId].isReady) {
          allReady = false;
        }
      });

      // If all players are ready, transition to InProgress state and broadcast the game starting event
      if (allReady && Object.keys(state.players).length === state.requiredPlayerCount) {
        state.gameState = GameState.InProgress;
        dispatcher.broadcastMessage(GAME_STARTING_OP_CODE);
      }
    }
  });

  // If we have no presences in the match according to the match state, increment the empty ticks count
  if (!state.presences) {
    state.emptyTicks++;
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
