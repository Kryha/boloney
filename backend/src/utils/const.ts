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

export const env = {
  TOOLKIT_BASE_URL: "http://zk-gaming-tk.zk-gaming-tk-local.svc.cluster.local:5001",

  init(ctx: nkruntime.Context) {
    if (ctx.env.TOOLKIT_BASE_URL) this.TOOLKIT_BASE_URL = ctx.env.TOOLKIT_BASE_URL;
  },
};
