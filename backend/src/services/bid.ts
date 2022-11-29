import { Bid, BidPayloadFrontend, Player } from "../types";

export const getLatestBid = (bidsRecord: Record<string, Bid>): Bid | undefined => {
  const bids = Object.values(bidsRecord);
  // highest date (most recent bid) will be the first element
  bids.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return bids.at(0);
};

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
