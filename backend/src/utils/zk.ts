import { MatchState } from "../types";
import { env } from "./env";

export const isZkEnabled = (matchState: MatchState, ctx: nkruntime.Context): boolean => {
  return env(ctx).ZK_ENABLED && matchState.settings.zkEnabled;
};
