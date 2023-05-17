import { Die, Player } from "../types";

export const totalDiceInMatch = (playersRecord: Record<string, Player>) => {
  const players = Object.values(playersRecord);
  const totalDice = players.reduce((total, player) => total + player.diceAmount, 0);
  return totalDice;
};

export const getDiceValues = (players: Record<string, Player>): Record<string, Die[]> => {
  return Object.entries(players).reduce((processed, [key, player]) => {
    return { ...processed, [key]: player.diceValue };
  }, {} as Record<string, Die[]>);
};

export const getTotalDiceWithFace = (players: Record<string, Player>, face: number) =>
  Object.values(players).reduce(
    (total, player) =>
      total +
      player.diceValue.reduce((subTotal, die) => {
        if (die.rolledValue === face) return subTotal + 1;
        return subTotal;
      }, 0),
    0
  );
