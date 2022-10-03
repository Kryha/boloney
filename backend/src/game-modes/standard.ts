const state = {
  precences: {},
  emptyTicks: 0,
};
export const matchInit = (
  _ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _params: Record<string, string>
): { state: nkruntime.MatchState; tickRate: number; label: string } => {
  logger.info("----------------- MATCH INITIALIZED -----------------");
  return {
    state,
    tickRate: 5, // 1 tick per second = 1 MatchLoop func invocations per second
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
  presences.forEach((p) => {
    logger.debug(p.username);
    state.presences[p.sessionId] = p;
  });
  logger.info("----------------- MATCH JOINED -----------------");
  logger.debug(String(presences.length));

  return {
    state,
  };
};

export const matchLoop = (
  _ctx: nkruntime.Context,
  _logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _dispatcher: nkruntime.MatchDispatcher,
  _tick: number,
  state: nkruntime.MatchState,
  _messages: nkruntime.MatchMessage[]
): { state: nkruntime.MatchState } | null => {
  // If we have no presences in the match according to the match state, increment the empty ticks count
  _logger.debug(JSON.stringify(state));
  _logger.debug(String(Object.keys(state.presences).length));
  if (!Object.keys(state.presences).length) {
    state.emptyTicks++;
  }

  // If the match has been empty for more than 100 ticks, end the match by returning null
  if (state.emptyTicks > 10000) return null;

  return {
    state,
  };
};

export const matchTerminate = (
  _ctx: nkruntime.Context,
  _logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _dispatcher: nkruntime.MatchDispatcher,
  _tick: number,
  state: nkruntime.MatchState,
  _graceSeconds: number
): { state: nkruntime.MatchState } | null => {
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
  _logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _dispatcher: nkruntime.MatchDispatcher,
  _tick: number,
  state: nkruntime.MatchState,
  presences: nkruntime.Presence[]
): { state: nkruntime.MatchState } | null => {
  presences.forEach((p) => {
    delete state.presences[p.sessionId];
  });

  return {
    state,
  };
};
