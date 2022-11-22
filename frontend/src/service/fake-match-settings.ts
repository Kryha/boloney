// TODO: delete file

import { MatchSettings } from "../types";

export const fakeMatchSettings: MatchSettings = {
  players: 7,
  dicePerPlayer: 10,
  initialPowerUpAmount: 10,
  maxPowerUpAmount: 10,
  availablePowerUps: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  healPowerUpAmount: 5,
  stageNumberDivisor: 5,
  drawRoundOffset: 5,
  powerUpProbability: [
    { id: "1", probability: 0.1 },
    { id: "2", probability: 0.1 },
    { id: "3", probability: 0.1 },
    { id: "4", probability: 0.1 },
    { id: "5", probability: 0.1 },
    { id: "6", probability: 0.1 },
    { id: "7", probability: 0.1 },
    { id: "8", probability: 0.1 },
    { id: "9", probability: 0.1 },
  ],
};
