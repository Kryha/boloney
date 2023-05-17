import { Bid, BidPayloadFrontend, BidWithUserId, Player } from "../types";
import { totalDiceInMatch } from "./die";

export const getLatestBid = (bids: Record<string, Bid>): BidWithUserId | undefined =>
  Object.entries(bids).reduce((prevLatest: BidWithUserId | undefined, [k, bid]) => {
    if (!prevLatest || prevLatest.createdAt < bid.createdAt) return { userId: k, ...bid };

    return prevLatest;
  }, undefined);

export const isBidMaxTotal = (playersRecord: Record<string, Player>, bid: BidPayloadFrontend) => {
  const totalDice = totalDiceInMatch(playersRecord);
  return totalDice >= bid.amount;
};

export const isBidHigher = (previousHighest: Bid, newHighest: BidPayloadFrontend): boolean => {
  if (!previousHighest) return true;
  const isHigherAmount = previousHighest.amount < newHighest.amount;
  const isHigherFace = previousHighest.face < newHighest.face;

  return isHigherAmount || isHigherFace;
};
