export const matchInit = (
  _ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _params: Record<string, string>
): { state: nkruntime.MatchState; tickRate: number; label: string } => {
  logger.info("----------------- MATCH INITIALIZED -----------------");

  const state = {
    precences: {},
    emptyTicks: 0,
  };

  return {
    state,
    tickRate: 1, // 1 tick per second = 1 MatchLoop func invocations per second},
    label: "StandardGame",
  };
};

export const matchJoinAttempt = (
  _ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _dispatcher: nkruntime.MatchDispatcher,
  _tick: number,
  state: nkruntime.MatchState,
  _presence: nkruntime.Presence,
  _metadata: { [key: string]: any }
): { state: nkruntime.MatchState; accept: boolean; rejectMessage?: string } | null => {
  logger.info("----------------- MATCH JOIN ATTEMPT -----------------");

  logger.debug(JSON.stringify(state));
  return { state, accept: true };
};

export const matchJoin = (
  _ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _dispatcher: nkruntime.MatchDispatcher,
  _tick: number,
  state: nkruntime.MatchState,
  presences: nkruntime.Presence[]
): { state: nkruntime.MatchState } | null => {
  logger.info("----------------- MATCH JOINED -----------------");

  presences.forEach((p) => {
    state.precences[p.sessionId] = p;
  });

  return {
    state,
  };
};

export const matchLoop = (
  _ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _dispatcher: nkruntime.MatchDispatcher,
  _tick: number,
  state: nkruntime.MatchState,
  _messages: nkruntime.MatchMessage[]
): { state: nkruntime.MatchState } | null => {
  logger.info("----------------- MATCH LOOP -----------------");

  // If we have no presences in the match according to the match state, increment the empty ticks count
  if (!state.presences) {
    state.emptyTicks++;
  }

  // If the match has been empty for more than 100 ticks, end the match by returning null
  if (state.emptyTicks > 500) return null;

  return {
    state,
  };
};

export const matchTerminate = (
  _ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _dispatcher: nkruntime.MatchDispatcher,
  _tick: number,
  state: nkruntime.MatchState,
  _graceSeconds: number
): { state: nkruntime.MatchState } | null => {
  logger.info("----------------- MATCH TERMINATE -----------------");

  return { state };
};

export const matchSignal = (
  _ctx: nkruntime.Context,
  _logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _dispatcher: nkruntime.MatchDispatcher,
  _tick: number,
  state: nkruntime.MatchState
): { state: nkruntime.MatchState } | null => {
  return { state };
};

export const matchLeave = (
  _ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _dispatcher: nkruntime.MatchDispatcher,
  _tick: number,
  state: nkruntime.MatchState,
  presences: nkruntime.Presence[]
): { state: nkruntime.MatchState } | null => {
  logger.info("----------------- MATCH LEAVE -----------------");

  presences.forEach((p) => {
    delete state.precences[p.sessionId];
  });

  return {
    state,
  };
};
