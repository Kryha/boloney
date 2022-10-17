import { MatchSettings } from "../interfaces";

export const enum MatchOpCode {
  READY,
  GAME_START,
}
export const isObject = (value: unknown): value is object => typeof value === "object";

export const MAX_DICE_PER_PLAYER = 10;
export const MIN_DICE_PER_PLAYER = 2;

export const DEFAULT_MATCH_SETTINGS: MatchSettings = {
  requiredPlayerCount: 2,
  dicePerPlayer: 5,
  powerupsPerPlayer: 3,
  availablePowerups: ["p1", "p2", "p3", "p4"],
  isUsingFakeCredits: true,
};

export const env = {
  TOOLKIT_BASE_URL: "http://zk-gaming-tk.zk-gaming-tk-local.svc.cluster.local:5001",

  init(ctx: nkruntime.Context) {
    if (ctx.env.TOOLKIT_BASE_URL) this.TOOLKIT_BASE_URL = ctx.env.TOOLKIT_BASE_URL;
  },
};
