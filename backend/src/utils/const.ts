import { MatchSettings } from "../types";

export const enum MatchOpCode {
  CONNECTED = 1, // OpCodes can't be 0 (had to find out the hard way)
  LOBBY_FULL,
  READY,
  MATCH_START,
}

export enum MatchPhase {
  WaitingForPlayers,
  WaitingForPlayersReady,
  InProgress,
}

export const isObject = (value: unknown): value is object => typeof value === "object";

export const MAX_DICE_PER_PLAYER = 10;
export const MIN_DICE_PER_PLAYER = 2;

// TODO: Power-ups will be in the form of:
// powerUps: {
// 	1: 0.25,
// 	2: 0,
// 	3: 0.3,
// 	4: 0.1,
// }
// Where the ones that are not available will have probability 0.
export const DEFAULT_MATCH_SETTINGS: MatchSettings = {
  requiredPlayerCount: 2,
  dicePerPlayer: 5,
  powerupsPerPlayer: 3,
  availablePowerups: ["p1", "p2", "p3", "p4"],
  isUsingFakeCredits: true,
};

export const PRIVATE_KEY_LENGTH = 58;
export const VIEW_KEY_LENGTH = 56;
export const ADDRESS_LENGTH = 63;

export const PRIVATE_KEY_PREFIX = "APrivateKey1";
export const VIEW_KEY_PREFIX = "AViewKey1";
export const ADDRESS_PREFIX = "aleo1";

export const env = {
  TOOLKIT_BASE_URL: "http://zk-gaming-tk.zk-gaming-tk-local.svc.cluster.local:5001",

  init(ctx: nkruntime.Context) {
    if (ctx.env.TOOLKIT_BASE_URL) this.TOOLKIT_BASE_URL = ctx.env.TOOLKIT_BASE_URL;
  },
};
