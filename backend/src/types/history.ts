import { BidWithUserId } from "./bid";
import { PowerUpId, UsePowerUpPayloadBackend } from "./power-up";

export type HistoryEvent = HistoryRoundStart | HistoryBidAction | HistoryPlayerAction | HistoryRoundResults;

export type HistoryBidAction = BidWithUserId & { eventType: "bidAction" };

type EventType = "bidAction" | "playerAction" | "roundResults" | "roundStart";

export type HistoryRoundEndAction = "boloney" | "exact" | "lostByTimeOut" | "leftMatch";

export type SaveHistoryPayload = {
  eventType: EventType;
  senderId?: string;
  powerUpPayload?: UsePowerUpPayloadBackend;
  roundEndAction?: HistoryRoundEndAction;
};

export interface HistoryPlayerAction {
  eventType: "playerAction";
  activePlayerName: string;
  targetPlayerName?: string;
  outcome?: string;
  actionName: PowerUpId | "healDice";
  createdAt: number;
}

export type HistoryRoundResults = {
  eventType: "roundResults";
  roundEnd: HistoryRoundEnd;
  roundWinner?: HistoryRoundPlayer;
  roundLoser?: HistoryRoundPlayer;
  roundStats: HistoryPlayerStats[];
};

export interface HistoryRoundStart {
  eventType: "roundStart";
  roundNumber: number;
  totalDiceAmount: number;
  stageNumber: number;
  roundsUntillDrawRound: number;
}

export interface HistoryRoundEnd {
  roundNumber: number;
  actionName: HistoryRoundEndAction;
  createdAt: number;
}

export type HistoryRoundPlayer = {
  playerStats: HistoryPlayerStats;
  isWinner: boolean;
};

export interface HistoryPlayerStats {
  userId: string;
  diceAmount: number;
  powerUpsAmount: number;
}
