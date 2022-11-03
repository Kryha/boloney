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
  {
    userId: "2222222",
    username: "shake.it",
    avatarId: 2,
    isConnected: true,
    isReady: false,
  },
  {
    userId: "33333",
    username: "something.great",
    avatarId: 3,
    isConnected: false,
    isReady: false,
  },
  {
    userId: "44444",
    username: "god",
    avatarId: 4,
    isConnected: true,
    isReady: false,
  },
  {
    userId: "55555",
    username: "lekker",
    avatarId: 5,
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
