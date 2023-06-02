import { HistoryEvent } from "../../types";

export const fakeHistory: HistoryEvent[] = [
  { eventType: "roundStart", roundNumber: 1, totalDiceAmount: 40, stageNumber: 1, roundsUntillDrawRound: 1 },
  { eventType: "bidAction", face: 2, amount: 3, createdAt: 1, userId: "000000000000000000000000000000000000" },
  {
    eventType: "playerAction",
    activePlayerName: "umpalumpa",
    outcome: "1",
    actionName: "healDice",
    createdAt: Date.now(),
  },
  { eventType: "bidAction", face: 4, amount: 6, createdAt: 1, userId: "000000000000000000000000000000000000" },
  { eventType: "bidAction", face: 1, amount: 5, createdAt: 1, userId: "000000000000000000000000000000000000" },
  {
    eventType: "playerAction",
    activePlayerName: "umpalumpa",
    outcome: "2",
    targetPlayerName: "sahsa",
    actionName: "4",
    createdAt: Date.now(),
  },
  {
    eventType: "roundResults",

    roundEnd: { roundNumber: 1, actionName: "boloney", createdAt: Date.now() },
    roundWinner: {
      playerStats: { userId: "000000000000000000000000000000000000", diceAmount: 1, powerUpsAmount: 2, diceValue: [] },
      isWinner: true,
    },
    roundLoser: {
      playerStats: { userId: "000000000000000000000000000000000001", diceAmount: 1, powerUpsAmount: 2, diceValue: [] },
      isWinner: false,
    },
    roundStats: [
      { userId: "000000000000000000000000000000000000", diceAmount: 1, powerUpsAmount: 2, diceValue: [{ rolledValue: 3 }] },
      { userId: "000000000000000000000000000000000001", diceAmount: 1, powerUpsAmount: 2, diceValue: [{ rolledValue: 3 }] },
      { userId: "000000000000000000000000000000000002", diceAmount: 1, powerUpsAmount: 2, diceValue: [{ rolledValue: 3 }] },
    ],
  },
];
