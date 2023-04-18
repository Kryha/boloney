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
  youWonTitle: "congratulations, you won the match!",
  youWonDescription: "go bask in your glory",
  youLost: "we have a winner!",
  weHaveAWinner: "we have a winner!",
  youLostDescription: "perhaps glory awaits you next time…",
  winner: "winner!",
  you: "(you)",
  wonByTimeOut: "won on the last round due to user time out",
  drawTitle: "draw due to internal errors",

  youLostTitle: (username: string) => `we have a match winner: congratulations, ${username}!`,
  callingBoldMove: (action: Action) => `calling ${action} is a bold move, old sport`,
  wonCalling: (action: Action): [string, string] => ["won on the last round ", `calling ${action}!`],
  lostOnRound: (round: RoundNumber): [string, string] => ["lost on the ", `${writeRound(round)} round`],
  username: (playerName: string, playerId: string, localId: string) => `${playerName} ${localId === playerId ? endOfMatch.you : ""}`,
};
