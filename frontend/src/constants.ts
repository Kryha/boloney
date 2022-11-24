import { MatchSettings } from "./types";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "backend.localhost";
export const API_URL = import.meta.env.VITE_API_URL || "api.localhost";
export const API_PORT = import.meta.env.VITE_API_PORT || "80";
export const SERVER_KEY = "defaultkey";

export const SMALL_VIEWPORT_HEIGHT = 800;
export const SMALL_VIEWPORT_WIDTH = 670;
export const MEDIUM_VIEWPORT_WIDTH = 1440;

// TODO: Add real game time
export const GAME_TIME_MINUTES = 1;
export const GAME_TIME_SECONDS = 30;
export const MILLISECONDS = 1000;
export const FIFTY_NINE_SECONDS = 59;
export const TEN_SECONDS = 10;
export const GO_BACK = -1;

export const MINIMUM_USERNAME_LENGTH = 2;
export const MINIMUM_PASSWORD_LENGTH = 8;
export const APPEAR_ONLINE = true;
export const CREATE_ACCOUNT = true;
export const USE_SSL = !!import.meta.env.VITE_USE_SSL || false;

export const MAX_PLAYERS = 7;
export const MIN_PLAYERS = 2;
export const MAX_DICE_PER_PLAYER = 10;
export const MIN_DICE_PER_PLAYER = 2;
export const MAX_POWERUPS_PER_PLAYER = 10;
export const MIN_POWERUPS_PER_PLAYER = 0;

export const MAX_STAGE_NUMBER_DIVISOR = 10;
export const MIN_STAGE_NUMBER_DIVISOR = 1;

export const MAX_DRAW_ROUND_OFFSET = -10;
export const MIN_DRAW_ROUND_OFFSET = 10;

export const MAX_HEAL_POWER_UP_AMOUNT = 10;
export const MIN_HEAL_POWER_UP_AMOUNT = 1;

export const FLOATING_ANIMATION_SPEED = 4;

export const AUTH_TOKEN_STORAGE_KEY = "auth_token";
export const REFRESH_TOKEN_STORAGE_KEY = "refresh_token";

// TODO: define these in a separate file
export const RPC_CREATE_MATCH = "create_match";
export const RPC_FIND_MATCH = "find_match";

export const DEFAULT_POOL_QUERY = "*";
export const DEFAULT_POOL_MIN_PLAYERS = 3;
export const DEFAULT_POOL_MAX_PLAYERS = 3;

export const PRIVATE_KEY_LENGTH = 58;
export const VIEW_KEY_LENGTH = 56;
export const ADDRESS_LENGTH = 63;

export const PRIVATE_KEY_PREFIX = "APrivateKey1";
export const VIEW_KEY_PREFIX = "AViewKey1";
export const ADDRESS_PREFIX = "aleo1";
export const POWER_UP_DEFAULT_VIEW = 6;
export const POWER_UP_DEFAULT_VIEW_SMALL = 5;
export const GAME_PLAYER_HEIGHT = 89;
// TODO: change the time
export const DECISION_MAKING_TIME_IN_SECONDS = 100;

export const DEFAULT_MATCH_SETTINGS: MatchSettings = {
  // TODO: change players to 7 before releasing to production
  players: 3,
  dicePerPlayer: 5,
  initialPowerUpAmount: 3,
  stageNumberDivisor: 5,
  drawRoundOffset: 0,
  healPowerUpAmount: 1,
  maxPowerUpAmount: 3,
  powerUpProbability: [
    {
      id: "1",
      probability: 25,
    },
    {
      id: "2",
      probability: 0,
    },
    {
      id: "3",
      probability: 0,
    },
    {
      id: "4",
      probability: 25,
    },
    {
      id: "5",
      probability: 0,
    },
    {
      id: "6",
      probability: 25,
    },
    {
      id: "7",
      probability: 0,
    },
    {
      id: "8",
      probability: 25,
    },
    {
      id: "9",
      probability: 0,
    },
  ],
  availablePowerUps: ["1", "4", "6", "8"],
};
