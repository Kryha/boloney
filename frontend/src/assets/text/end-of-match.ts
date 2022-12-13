import { Action } from "../../types";
import { countNumber } from "../../util";

type RoundNumber = "last" | number;

const writeRound = (round: RoundNumber): string => {
  if (round === "last") return round;
  return countNumber(round);
};

export const endOfMatch = {
  endOfMatch: "end of the match",
  youWon: "congratulations, you won!",
  youLost: "you have lost!",
  weHaveAWinner: "we have a winner!",
  winner: "winner!",
  you: "(you)",

  callingBoldMove: (action: Action) => `calling ${action} is a bold move, old sport`,
  wonCalling: (action: Action): [string, string] => ["won on the last round ", `calling ${action}!`],
  lostOnRound: (round: RoundNumber): [string, string] => ["lost on the ", `${writeRound(round)} round`],
  username: (playerName: string, playerId: string, localId: string) => `${playerName} ${localId === playerId ? endOfMatch.you : ""}`,
};
