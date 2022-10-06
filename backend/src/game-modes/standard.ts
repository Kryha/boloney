import { PowerupType } from "../interfaces";
import { MatchState } from "../interfaces/match-state";

export const matchInit = (
  _ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  params: Record<string, string>
): { state: nkruntime.MatchState; tickRate: number; label: string } => {
  logger.info("----------------- MATCH INITIALIZED -----------------");

  const initialState: MatchState = {
    presences: {},
    emptyTicks: 0,
    players: Number(params.players),
    dicePerPlayer: Number(params.dicePerPlayer),
    powerupsPerPlayer: Number(params.powerupsPerPlayer),
    availablePowerups: [params.availablePowerups] as PowerupType[],
    isUsingFakeCredits: !!+params.isUsingFakeCredits,
  };

  logger.info("----------------- STATE -----------------");
  logger.debug(JSON.stringify(initialState));

  return {
    state: initialState,
    tickRate: 1, // 1 tick per second = 1 matchLoop func invocations per second.
    // TODO: Set tickRate to 5 after development is done for improved UX. But for dev purposes 1 is more than enough.
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

  // A custom match starts right after creating it, so it needs to check manually if the room is full/joinable.
  const canPlayerJoin = Object.keys(state.presences).length < state.players;

  return { state, accept: canPlayerJoin };
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
    state.presences[p.sessionId] = p;
  });

  // Do we have enough players in a custom game to kick off the match?
  // This is always true in 'Quick play' mode, where a match only starts when enough players are in the lobby.
  if (Object.keys(state.presences).length === state.players) {
    logger.info("----------------- MATCH STARTED! -----------------");
    // TODO: Implementation
  }

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
  logger.info(`PRESENCE COUNT: ${String(Object.keys(state.presences).length)}`);

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
  logger: nkruntime.Logger,
  _nk: nkruntime.Nakama,
  _dispatcher: nkruntime.MatchDispatcher,
  _tick: number,
  state: nkruntime.MatchState
): { state: nkruntime.MatchState } | null => {
  logger.info("----------------- MATCH SIGNAL -----------------");
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
    delete state.presences[p.sessionId];
  });

  return {
    state,
  };
};
