import { MatchSettings } from "../types";

export const enum Scene {
  Initializer = 0,
  Home = 1,
  Lobby = 2,
  Game = 3,
  RoundResult = 4,
  FinalResult = 5,
}

export const enum OperationCode {
  Players = 0,
  PlayerJoined = 1,
  PlayerInput = 2,
  PlayerWon = 3,
  ChangeScene = 4,
}

export const enum OP {
  Start = 0,
  Bet = 1,
  Update = 2,
  Done = 3,
  Reject = 4,
}

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
  requiredPlayers: 2,
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
