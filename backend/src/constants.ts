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
  zkEnabled: false,
};

export const PRIVATE_KEY_LENGTH = 59;
export const VIEW_KEY_LENGTH = 53;
export const ADDRESS_LENGTH = 63;

export const PRIVATE_KEY_PREFIX = "APrivateKey1";
export const VIEW_KEY_PREFIX = "AViewKey1";
export const ADDRESS_PREFIX = "aleo1";

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

export const TOOLKIT_ENDPOINTS = {
  account: {
    create: "/account/create",
  },
  match: {
    create: "/boloney/create-match",
    createMatchSummary: "/boloney/create-match-summary",
  },
  dice: {
    create: "/dice/create",
    burn: "/dice/burn",
    increment: "/dice/increment",
    decrement: "/dice/decrement",
  },
  powerUps: {
    create: "/power-ups/create",
    burn: "/power-ups/burn",
    transfer: "/power-ups/transfer",
    useBirdsEye: "/power-ups/2",
  },
  random: {
    number: "/random/number",
  },
};

//TODO: get variable from envirement variables
export const TICK_RATE = 1;
export const MAX_INACTIVE_TICKS = 1000;
export const GRACE_SECONDS = 2;

export const EMPTY_DATA = "{}";

export const MENAGE_A_TROIS_DICE_AMOUNT = 3;

export const HASH_MAX_RANGE = 999999;
export const HASH_CHAIN_LENGTH = 32;

export const STORAGE_ACCOUNT_COLLECTION = "accounts";
export const STORAGE_ADDRESS_KEY = "aleo-address";
export const STORAGE_KEYS_KEY = "aleo-keys";

export const MAX_TOOLKIT_REQUESTS_ATTEMPTS = 3;
export const MAX_ROLL_BACK_ATTEMPTS = 3;
