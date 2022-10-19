import { MatchSettings, MatchState, OpCode, PlayerState } from "../interfaces/match";

const defaultSettings: MatchSettings = {
  requiredPlayers: 7,
  dicePerPlayer: 5,
  powerupsPerPlayer: 3,
  availablePowerups: ["p1", "p2", "p3"],
  isUsingFakeCredits: true,
};

export const matchInit: nkruntime.MatchInitFunction = (_ctx, logger, _nk, _params) => {
  logger.info("----------------- MATCH INITIALIZED -----------------");

  const initialState: MatchState = {
    setting: defaultSettings,
    presences: [],
    players: [],
    playerCount: 0,
    playerOrder: [],
    matchStage: 1,
    emptyTicks: 0,
  };

  logger.info("----------------- STATE -----------------");
  logger.debug(JSON.stringify(initialState));
  return {
    state: initialState,
    tickRate: 1, // 1 tick per second = 1 matchLoop func invocations per second.
    // TODO: Set tickRate to 5 after development is done for improved UX. But for dev purposes 1 is more than enough.
    label: "standardGame",
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
    if (state.players) state.players.push({ presence: p, isReady: false });
  });

  return {
    state,
  };
};

export const matchLoop: nkruntime.MatchLoopFunction = (_ctx, logger, _nk, dispatcher, _tick, state, messages) => {
  logger.info("----------------- MATCH LOOP -----------------");
  logger.info(`PRESENCE COUNT: ${String(Object.keys(state.presences).length)}`);

  // If we have no presences in the match according to the match state, increment the empty ticks count
  if (!state.presences) {
    state.emptyTicks++;
  }
  messages.forEach((message: nkruntime.MatchMessage) => {
    if (state.matchStage === 2) {
      state.players.players.forEach((player: PlayerState) => {});
      dispatcher.broadcastMessage(OpCode.getPowerups);
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
  presences.forEach((p) => {
    delete state.presences?.[p.sessionId];
  });

  return {
    state,
  };
};
