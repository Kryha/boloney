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

export const TOOLKIT_BASE_URL = "http://localhost:5001/";

export const success = (message: string, logger: nkruntime.Logger) => {
  logger.info(message);
  return JSON.stringify({ success: true });
};

export const EXISTING_KEYS = "User already has existing keys";
export const SUCCES_CREATING_ACCOUNT = "Created new user account on Aleo successfully";
export const FAILED_WRITING_COLLECTION = "Writing to the collection failed";

export const MAX_DICE_PER_PLAYER = 10;
export const MIN_DICE_PER_PLAYER = 2;
