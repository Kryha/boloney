import { Action, PlayerPublic } from "../../types";
import { CallBoloneyLoser, CallBoloneyWinner, CallExactLoser, CallExactWinner, TimerIsOut } from "../images";
import { text } from "../text";

interface ResultTextData {
  headingTitle: string;
  subHeadingTitle: string;
}

export interface ResultData {
  activeWinner: ResultTextData;
  activeLoser: ResultTextData;
  targetWinner: ResultTextData;
  targetLoser: ResultTextData;
  lostAllDice: ResultTextData;
  winnerImg: string;
  loserImg: string;
  name: string;
}

export const getResultData = (action: Action, winner?: PlayerPublic, dieAmount?: number): ResultData => {
  const winnerUserName = winner ? winner.username : "";
  switch (action) {
    case "Boloney":
      return {
        activeWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youRock },
        activeLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.youSuck },
        targetWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youCanBreath },
        targetLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.param.youSuckAtBluffing(winnerUserName) },
        lostAllDice: { headingTitle: text.playerTurn.youDied, subHeadingTitle: text.playerTurn.lostAllDice },
        winnerImg: CallBoloneyWinner,
        loserImg: CallBoloneyLoser,
        name: text.playerTurn.boloney,
      };
    case "Exact":
      return {
        activeWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.param.youRockAtExact(dieAmount || 0) },
        activeLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.youSuckCallingExact },
        targetWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youCanBreath },
        targetLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.youSuckCallingExact },
        lostAllDice: { headingTitle: text.playerTurn.youDied, subHeadingTitle: text.playerTurn.lostAllDice },
        winnerImg: CallExactWinner,
        loserImg: CallExactLoser,
        name: text.playerTurn.exact,
      };
    case "lostByTimeOut":
      return {
        activeWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.param.youRockAtExact(dieAmount || 0) },
        activeLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.youSuckCallingExact },
        targetWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youCanBreath },
        targetLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.youSuckCallingExact },
        lostAllDice: { headingTitle: text.playerTurn.youDied, subHeadingTitle: text.playerTurn.lostAllDice },
        winnerImg: TimerIsOut,
        loserImg: TimerIsOut,
        name: text.playerTurn.loser,
      };
  }
};
