import { MatchSettings } from "./types";

export const DEV_ENVIRONMENT = import.meta.env.DEV;
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "backend.localhost";
export const API_URL = import.meta.env.VITE_API_URL || "api.localhost";
export const API_PORT = import.meta.env.VITE_API_PORT || "80";
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
export const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || "10000";

export const SERVER_KEY = "defaultkey";

export const SMALL_VIEWPORT_HEIGHT = 800;
export const SMALL_VIEWPORT_WIDTH = 670;
export const SMALLER_VIEWPORT_WIDTH = 1100;
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

export const SOUND_TIMER_TRIGGERS = [10, 6, 5, 4, 3, 2, 1];

// TODO: change the time
export const DECISION_MAKING_TIME_IN_SECONDS = 100;

export const MAX_DIE_FACE = 6;
export const MIN_DIE_FACE = 1;
export const ARRAY_OF_POSABLE_DIE_FACES = Array.from({ length: MAX_DIE_FACE }, (_, index) => index + 1);

export const DEFAULT_MATCH_SETTINGS: MatchSettings = {
  players: 5,
  dicePerPlayer: 5,
  initialPowerUpAmount: 3,
  stageNumberDivisor: 5,
  drawRoundOffset: 0,
  healPowerUpAmount: 5,
  maxPowerUpAmount: 7,
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
  availablePowerUps: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  zkEnabled: false,
};

export const COPIED_TEXT_TIMEOUT = 2500;
export const NOTIFICATION_VISIBILITY_TIME = 10000;

export const MAX_DICE_VIEW_AMOUNT = 6;
export const MAX_POWER_UP_VIEW_AMOUNT = 5;
export const MINIMUM_POWER_UP_WIDTH_VIEW = 1045;

export const MATCH_STATS_DICE_VALUE = 2;

//TODO: fix styled.ul for bullet points in rule set...
export const BULLET_POINT = "\u2022 ";
export const MAX_PLAYER_SIDEBAR_AMOUNT = 6;

export const MAX_SIDEBAR_POWER_UPS_SHOWN = 2;
export const MIN_SIDEBAR_POWER_UPS_SHOWN = 1;

export const POWER_UP_HELPER_WIDTH = 426;
export const HEAL_DICE_HELPER_WIDTH = 455;
export const BID_HELPER_WIDTH = 455;
export const BOLONEY_HELPER_WIDTH = 426;
export const EXACT_HELPER_WIDTH = 368;

export const FADE_INTERVAL_MS = 4000;

export const OPEN_LINK_IN_NEW_TAB = "_blank";

export const FADE_TRANSITION_DURATION = 0.4;

export const MULTIPLE_FADE_TRANSITION_DURATION = 0.2;

export const HEAL_DICE_BUTTON_INDEX = 2;
export const BID_BUTTON_INDEX = 3;
export const BOLONEY_BUTTON_INDEX = 4;
export const EXACT_BUTTON_INDEX = 5;
