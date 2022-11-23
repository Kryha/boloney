import { countNumber } from "../../util";

type BoloneyOrExact = "Boloney" | "Exact";
type RoundNumber = "last" | number;

const writeRound = (round: RoundNumber): string => {
  if (round === "last") return round;
  return countNumber(round);
};

export const endOfMatch = {
  endOfMatch: "end of the match",
  youWon: "congratulations, you won!",
  youLost: "you've lost",
  weHaveAWinner: "we have a winner",
  winner: "winner!",

  callingBoldMove: (action: BoloneyOrExact) => `calling ${action} is a bold move, old sport`,
  wonCalling: (action: BoloneyOrExact) => `won on the last round calling ${action}!`,
  lostOnRound: (round: RoundNumber) => `lost on the ${writeRound(round)} round`,
};
