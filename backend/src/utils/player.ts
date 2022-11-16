import { Player, PlayerPublic } from "../types";

export const hidePlayerData = (player: Player): PlayerPublic => {
  const copy = Object.assign({}, player); // making a hard copy of the object
  const { diceValue: _, powerUpIds: __, ...publicData } = copy;
  return publicData;
};

export const hidePlayersData = (players: Record<string, Player>): Record<string, PlayerPublic> => {
  return Object.entries(players).reduce((processed, [key, player]) => {
    return { ...processed, [key]: hidePlayerData(player) };
  }, {} as Record<string, PlayerPublic>);
};
