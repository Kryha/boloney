import { PlayerPublic, TurnAction, TurnActionStep } from "../../types";
import { getNumberWithOrdinal, getRandomMessage } from "../../util";
import { text } from "../text";

interface PlayerTurnData {
  timerTitle: string;
  headingTitle?: string;
  subHeadingTitle?: string;
}

export const idlePlayerTurnData = (activePlayer: PlayerPublic, round: number, step?: TurnActionStep): PlayerTurnData => {
  if (step === "results") {
    return {
      timerTitle: text.param.endOfRound(getNumberWithOrdinal(round)),
    };
  } else {
    return {
      timerTitle: text.playerTurn.waitingTime,
      headingTitle: text.param.playerIsMakingAMove(activePlayer.username),
      subHeadingTitle: getRandomMessage(text.playerTurn.randomMessages),
    };
  }
};

const proceedActions = (action: TurnAction, lastActivePlayerName: string): PlayerTurnData => {
  switch (action) {
    case "bid":
      return {
        timerTitle: text.playerTurn.placeBid,
        headingTitle: text.playerTurn.makeYourClaim,
        subHeadingTitle: text.playerTurn.bidOnValue,
      };
    case "boloney":
      return {
        timerTitle: text.playerTurn.boloney,
        headingTitle: text.playerTurn.smellABluff,
        subHeadingTitle: text.param.areYouSureYouWantToCallBoloney(lastActivePlayerName),
      };

    //TODO: set correct text for powerUp
    case "powerUp":
      return {
        timerTitle: "",
        headingTitle: "",
        subHeadingTitle: "",
      };

    case "healDice":
      return {
        timerTitle: text.playerTurn.healDice,
        headingTitle: text.playerTurn.iAmBack,
        subHeadingTitle: text.playerTurn.choose5PowerUps,
      };

    case "exact":
      return {
        timerTitle: text.playerTurn.exact,
        headingTitle: text.playerTurn.callExact,
        subHeadingTitle: text.playerTurn.areYouSureYouWantToCallExact,
      };
  }
};

//TODO: replace with correct text
const evaluateResults = {
  bid: {
    timerTitle: "",
    headingTitle: "",
    subHeadingTitle: "",
  },
  boloney: {
    timerTitle: text.playerTurn.callBoloney,
    headingTitle: text.playerTurn.letsSeeWhoIsRight,
    subHeadingTitle: getRandomMessage(text.playerTurn.randomMessages),
  },
  powerUp: {
    timerTitle: "",
    headingTitle: "",
    subHeadingTitle: "",
  },
  healDice: {
    timerTitle: "",
    headingTitle: "",
    subHeadingTitle: "",
  },
  exact: {
    timerTitle: text.match.callExact,
    headingTitle: text.playerTurn.letsSeeWhoIsRight,
    subHeadingTitle: getRandomMessage(text.playerTurn.randomMessages),
  },
};

export const activePlayerTurnData = (
  action: TurnAction | undefined,
  steps: TurnActionStep,
  round: number,
  lastActivePlayerName: string | undefined,
  healDiceAmount?: number
): PlayerTurnData => {
  switch (steps) {
    case "pickAction":
      return {
        timerTitle: text.match.takeAction,
        headingTitle: text.match.whatsYourNextMove,
        subHeadingTitle: text.match.goOnShowThem,
      };
    case "proceedWithAction":
      if (action === "healDice") {
        const healDiceData = proceedActions(action, lastActivePlayerName || "");
        healDiceData.subHeadingTitle = text.param.healDice(healDiceAmount ? healDiceAmount.toString() : "0");
        return healDiceData;
      }
      if (action) return proceedActions(action, lastActivePlayerName || "");
      return {
        timerTitle: "",
        headingTitle: "",
        subHeadingTitle: "",
      };
    case "evaluateWinner":
      if (action) return evaluateResults[action];
      return {
        timerTitle: "",
        headingTitle: "",
        subHeadingTitle: "",
      };
    case "results":
      return { timerTitle: text.param.endOfRound(getNumberWithOrdinal(round)) };
  }
};
