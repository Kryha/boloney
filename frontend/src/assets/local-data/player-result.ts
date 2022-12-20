import { Action, PlayerPublic } from "../../types";
import { BoloneyToaster, ExactDartBoard } from "../images";
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
  img: string;
  name: string;
}

export const getResultData = (action: Action, winner: PlayerPublic, dieAmount?: number): ResultData => {
  switch (action) {
    case "Boloney":
      return {
        activeWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youRock },
        activeLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.youSuck },
        targetWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youCanBreath },
        targetLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.param.youSuckAtBluffing(winner.username) },
        img: BoloneyToaster,
        name: text.playerTurn.boloney,
      };
    case "Exact":
      return {
        activeWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.param.youRockAtExact(dieAmount || 0) },
        activeLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.youSuckCallingExact },
        targetWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youCanBreath },
        targetLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.youSuckCallingExact },
        img: ExactDartBoard,
        name: text.playerTurn.exact,
      };
  }
};
