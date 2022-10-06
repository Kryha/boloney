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
    availablePowerups: <PowerupType[]>[...params.availablePowerups],
    isUsingFakeCredits: !!+params.isUsingFakeCredits,
  };

  logger.info("----------------- STATE -----------------");
  logger.debug(JSON.stringify(initialState));

  return {
    state: initialState,
    tickRate: 1, // 1 tick per second = 1 matchLoop func invocations per second,
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
