// TODO: delete this file
import { Player } from "../types";

export const fakePlayers: Player[] = [
  {
    userId: "000000000",
    username: "umpalumpa",
    avatarId: 1,
    isConnected: true,
    isReady: false,
  },
  {
    userId: "11111111",
    username: "señor.garfio",
    avatarId: 2,
    isConnected: false,
    isReady: false,
  },
  {
    userId: "2222222",
    username: "shake.it",
    avatarId: 3,
    isConnected: true,
    isReady: false,
  },
  {
    userId: "33333",
    username: "something.great",
    avatarId: 4,
    isConnected: false,
    isReady: false,
  },
  {
    userId: "44444",
    username: "god",
    avatarId: 5,
    isConnected: true,
    isReady: false,
  },
  {
    userId: "55555",
    username: "lekker",
    avatarId: 6,
    isConnected: false,
    isReady: false,
  },
];

export const fakeLocalPlayer: Player = {
  userId: "666666",
  username: "yoda",
  avatarId: 7,
  isConnected: true,
  isReady: false,
};
