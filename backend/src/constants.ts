import { MatchSettings, MatchStage } from "./types";

export const MAX_DIE_FACE = 6;
export const MIN_DIE_FACE = 1;

export const MAX_DICE_PER_PLAYER = 10;
export const MIN_DICE_PER_PLAYER = 2;

export const DEFAULT_MATCH_SETTINGS: MatchSettings = {
  players: 3,
  dicePerPlayer: 5,
  initialPowerUpAmount: 3,
  stageNumberDivisor: 5,
  drawRoundOffset: 0,
  healPowerUpAmount: 1,
  maxPowerUpAmount: 3,
  availablePowerUps: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  powerUpProbability: [
    {
      id: "1",
      probability: 12,
    },
    {
      id: "2",
      probability: 11,
    },
    {
      id: "3",
      probability: 11,
    },
    {
      id: "4",
      probability: 11,
    },
    {
      id: "5",
      probability: 11,
    },
    {
      id: "6",
      probability: 11,
    },
    {
      id: "7",
      probability: 11,
    },
    {
      id: "8",
      probability: 11,
    },
    {
      id: "9",
      probability: 11,
    },
  ],
};

export const PRIVATE_KEY_LENGTH = 58;
export const VIEW_KEY_LENGTH = 56;
export const ADDRESS_LENGTH = 63;

export const PRIVATE_KEY_PREFIX = "APrivateKey1";
export const VIEW_KEY_PREFIX = "AViewKey1";
export const ADDRESS_PREFIX = "aleo1";

export const env = {
  // TODO: config envs correctly
  // TOOLKIT_BASE_URL: "http://zk-gaming-tk.zk-gaming-tk-local.svc.cluster.local:5001",
  TOOLKIT_BASE_URL: "https://zk-gaming-tk.staging.kryha.dev",

  init(ctx: nkruntime.Context) {
    if (ctx.env.TOOLKIT_BASE_URL) this.TOOLKIT_BASE_URL = ctx.env.TOOLKIT_BASE_URL;
  },
};
export const NOT_USED = "Don't use this title";
export const MATCH_STAGES: readonly MatchStage[] = [
  "lobbyStage",
  "getPowerUpStage",
  "rollDiceStage",
  "playerTurnLoopStage",
  "roundSummaryStage",
  "endOfMatchStage",
  "terminateMatchStage",
];

//TODO: get variable from envirement variables
export const TICK_RATE = 1;
export const MAX_INACTIVE_TICKS = 500;

export const EMPTY_DATA = JSON.stringify({});
