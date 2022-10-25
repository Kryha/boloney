import { MatchSettings } from "../types";

export const MAX_DICE_PER_PLAYER = 10;
export const MIN_DICE_PER_PLAYER = 2;

export const DEFAULT_MATCH_SETTINGS: MatchSettings = {
  players: 2,
  dicePerPlayer: 5,
  initialPowerUpAmount: 3,
  stageNumberDivisor: 5,
  drawRoundOffset: 0,
  availablePowerUps: ["1", "2", "3", "4"],
  healPowerUpAmount: 1,
  maxPowerUpAmount: 3,
  powerUpProbability: [
    {
      id: "1",
      probability: 25,
    },
    {
      id: "2",
      probability: 25,
    },
    {
      id: "3",
      probability: 25,
    },
    {
      id: "4",
      probability: 25,
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
  TOOLKIT_BASE_URL: "http://zk-gaming-tk.zk-gaming-tk-local.svc.cluster.local:5001",

  init(ctx: nkruntime.Context) {
    if (ctx.env.TOOLKIT_BASE_URL) this.TOOLKIT_BASE_URL = ctx.env.TOOLKIT_BASE_URL;
  },
};
