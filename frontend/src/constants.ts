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

export const FLOATING_ANIMATION_SPEED = 4;

export const AUTH_TOKEN_STORAGE_KEY = "auth_token";
export const REFRESH_TOKEN_STORAGE_KEY = "refresh_token";

// TODO: define these in a separate file
export const RPC_CREATE_MATCH = "create_match";
export const RPC_FIND_MATCH = "find_match";

export const DEFAULT_POOL_QUERY = "*";
export const DEFAULT_POOL_MIN_PLAYERS = 2;
export const DEFAULT_POOL_MAX_PLAYERS = 2;

export const PRIVATE_KEY_LENGTH = 58;
export const VIEW_KEY_LENGTH = 56;
export const ADDRESS_LENGTH = 63;

export const PRIVATE_KEY_PREFIX = "APrivateKey1";
export const VIEW_KEY_PREFIX = "AViewKey1";
export const ADDRESS_PREFIX = "aleo1";

export const enum MatchOpCode {
  CONNECTED = 1,
  LOBBY_FULL,
  READY,
  GAME_START,
}
