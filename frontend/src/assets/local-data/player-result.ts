// TODO: update file with other actions
import { PlayerPublic, TurnAction } from "../../types";
import { BoloneyToaster } from "../images";
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

export const getResultData = (action: TurnAction | undefined, activePlayer: PlayerPublic): ResultData => {
  switch (action) {
    case "bid":
      return {
        activeWinner: { headingTitle: "", subHeadingTitle: "" },
        activeLoser: { headingTitle: "", subHeadingTitle: "" },
        targetWinner: { headingTitle: "", subHeadingTitle: "" },
        targetLoser: { headingTitle: "", subHeadingTitle: "" },
        img: "",
        name: "",
      };
    case "boloney":
      return {
        activeWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youRock },
        activeLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.playerTurn.youSuck },
        targetWinner: { headingTitle: text.playerTurn.youHaveWon, subHeadingTitle: text.playerTurn.youCanBreath },
        targetLoser: { headingTitle: text.playerTurn.youHaveLost, subHeadingTitle: text.param.youSuckAtBluffing(activePlayer.username) },
        img: BoloneyToaster,
        name: text.playerTurn.boloney,
      };
    case "exact":
      return {
        activeWinner: { headingTitle: "", subHeadingTitle: "" },
        activeLoser: { headingTitle: "", subHeadingTitle: "" },
        targetWinner: { headingTitle: "", subHeadingTitle: "" },
        targetLoser: { headingTitle: "", subHeadingTitle: "" },
        img: "",
        name: "",
      };
    case "healDice":
      return {
        activeWinner: { headingTitle: "", subHeadingTitle: "" },
        activeLoser: { headingTitle: "", subHeadingTitle: "" },
        targetWinner: { headingTitle: "", subHeadingTitle: "" },
        targetLoser: { headingTitle: "", subHeadingTitle: "" },
        img: "",
        name: "",
      };
    case "powerUp":
      return {
        activeWinner: { headingTitle: "", subHeadingTitle: "" },
        activeLoser: { headingTitle: "", subHeadingTitle: "" },
        targetWinner: { headingTitle: "", subHeadingTitle: "" },
        targetLoser: { headingTitle: "", subHeadingTitle: "" },
        img: "",
        name: "",
      };
    default:
      return {
        activeWinner: { headingTitle: "", subHeadingTitle: "" },
        activeLoser: { headingTitle: "", subHeadingTitle: "" },
        targetWinner: { headingTitle: "", subHeadingTitle: "" },
        targetLoser: { headingTitle: "", subHeadingTitle: "" },
        img: "",
        name: "",
      };
  }
};
