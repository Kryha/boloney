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
  playerName: string;
}

export const getResultData = (action: Action, localPlayer: PlayerPublic, winner?: PlayerPublic): ResultData => {
  const winnerUserName = winner ? winner.username : "";
  const playerName = localPlayer.isActive ? localPlayer.username : winnerUserName;
  switch (action) {
    case "Boloney":
      return {
        activeWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youRock },
        activeLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.badTimeCallingBoloney },
        targetWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youAreRocking },
        targetLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.badTimeToBluff },
        lostAllDice: { headingTitle: text.playerTurn.youDied, subHeadingTitle: text.playerTurn.lostAllDice },
        winnerImg: CallBoloneyWinner,
        loserImg: CallBoloneyLoser,
        name: text.playerTurn.boloney,
        playerName: playerName,
      };
    case "Exact":
      return {
        activeWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youRockAtExact },
        activeLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.youSuckCallingExact },
        targetWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.param.activeWasRightExact(playerName) },
        targetLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.param.activeWasWrongExact(playerName) },
        lostAllDice: { headingTitle: text.playerTurn.youDied, subHeadingTitle: text.playerTurn.lostAllDice },
        winnerImg: CallExactWinner,
        loserImg: CallExactLoser,
        name: text.playerTurn.exact,
        playerName: playerName,
      };
    case "lostByTimeOut":
      return {
        activeWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: "" },
        activeLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: "" },
        targetWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: "" },
        targetLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: "" },
        lostAllDice: { headingTitle: text.playerTurn.youDied, subHeadingTitle: text.playerTurn.lostAllDice },
        winnerImg: TimerIsOut,
        loserImg: TimerIsOut,
        name: text.playerTurn.loser,
        playerName: playerName,
      };
  }
};
