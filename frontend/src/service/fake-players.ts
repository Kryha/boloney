// TODO: delete this file
import { Player } from "../types";

export const fakePlayers: Player[] = [
  {
    userId: "000000000",
    username: "umpalumpa",
    avatarId: 0,
    isConnected: true,
    isReady: false,
  },
  {
    userId: "11111111",
    username: "señor.garfio",
    avatarId: 1,
    isConnected: false,
    isReady: false,
  },
];

export const fakeActivePlayer: Player = {
  userId: "666666",
  username: "yoda",
  avatarId: 6,
  isConnected: true,
  isReady: false,
};
