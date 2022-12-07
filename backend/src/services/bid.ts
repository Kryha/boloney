import { Bid, BidPayloadFrontend, BidWithUserId, Player } from "../types";

export const getLatestBid = (bids: Record<string, Bid>): BidWithUserId | undefined =>
  Object.entries(bids).reduce((prevLatest: BidWithUserId | undefined, [k, bid]) => {
    if (!prevLatest || prevLatest.createdAt < bid.createdAt) return { userId: k, ...bid };
    return prevLatest;
  }, undefined);

export const isBidMaxTotal = (playersRecord: Record<string, Player>, bid: BidPayloadFrontend) => {
  const players = Object.values(playersRecord);
  const totalDice = players.reduce((total, player) => total + player.diceAmount, 0);
  return totalDice >= bid.amount;
};

export const isBidHigher = (previousHighest: Bid, newHighest: BidPayloadFrontend): boolean => {
  const sameFace = previousHighest.face === newHighest.face && previousHighest.amount < newHighest.amount;
  const sameAmount = previousHighest.amount === newHighest.amount && previousHighest.face < newHighest.face;
  const bothHigher = previousHighest.amount < newHighest.amount && previousHighest.face < newHighest.face;

  return sameFace || sameAmount || bothHigher;
};
