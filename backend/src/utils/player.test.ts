import { AvatarId, Die, Player, PlayerPublic, PowerUpId } from "../types";
import { hidePlayerData, hidePlayersData } from "./player";

describe("Hide private data from players", () => {
  const firstPlayerPublic = {
    userId: "5vfdsva",
    username: "player1",
    avatarId: 3 as AvatarId,
    diceAmount: 1,
    powerUpsAmount: 1,
    isConnected: true,
    isReady: true,
    hasInitialPowerUps: true,
    hasRolledDice: true,
  } as PlayerPublic;
  const firstPlayer = {
    diceValue: [{ rolledValue: 5 } as Die],
    powerUpIds: ["1" as PowerUpId],
    ...firstPlayerPublic,
  } as Player;
  const secondPlayerPublic = {
    userId: "5decdsaf",
    username: "player2",
    avatarId: 2 as AvatarId,
    diceAmount: 1,
    powerUpsAmount: 1,
    isConnected: true,
    isReady: true,
    hasInitialPowerUps: true,
    hasRolledDice: true,
  } as PlayerPublic;
  const secondPlayer = {
    diceValue: [{ rolledValue: 5 } as Die],
    powerUpIds: ["1" as PowerUpId],
    ...secondPlayerPublic,
  } as Player;

  describe("hidePlayerData function", () => {
    it("should return a publicPlayer, removing private data", () => {
      expect(hidePlayerData(firstPlayer)).toEqual(firstPlayerPublic);
    });
  });

  describe("hidePlayersData function", () => {
    it("should return a Record of publicPlayers, removing private data", () => {
      const value: Record<string, Player> = { [firstPlayer.userId]: firstPlayer, [secondPlayer.userId]: secondPlayer };
      const result: Record<string, PlayerPublic> = {
        [firstPlayerPublic.userId]: firstPlayerPublic,
        [secondPlayerPublic.userId]: secondPlayerPublic,
      };
      expect(hidePlayersData(value)).toEqual(result);
    });
  });
});
