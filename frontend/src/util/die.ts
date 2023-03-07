import { avatars } from "../assets";
import { AvatarColor, Bid, Die, PlayerPublic } from "../types";

export const getDieColor = (player: PlayerPublic): AvatarColor => avatars[player.avatarId].color;

export const filterDice = (diceToFilter: Die[], playersDice?: Die[]) => {
  if (!playersDice) return;

  const countDie = diceToFilter.reduce((dieCount, die) => {
    dieCount[die.rolledValue] = (dieCount[die.rolledValue] || 0) + 1;
    return dieCount;
  }, {} as { [key: number]: number });

  return playersDice.filter((rolledValue) => countDie[rolledValue.rolledValue] === undefined || --countDie[rolledValue.rolledValue] < 0);
};

export const getMinFaceValue = (lastBid: Bid | undefined, totalDice: number) => {
  return lastBid && lastBid.amount === totalDice ? lastBid.face + 1 : 1;
};
