// TODO: update file with with different actions
import { PlayerPublic, TurnAction, TurnActionStep } from "../../types";
import { getNumberWithOrdinal } from "../../util";
import { text } from "../text";

interface PlayerTurnData {
  timerTitle: string;
  headingTitle?: string;
  subHeadingTitle?: string;
}

export const idlePlayerTurnData = (steps: TurnActionStep, activePlayer: PlayerPublic): PlayerTurnData => {
  if (steps === "results") {
    return {
      timerTitle: text.param.endOfRound(getNumberWithOrdinal(1)),
    };
  } else {
    return {
      timerTitle: text.playerTurn.waitingTime,
      headingTitle: text.param.playerIsMakingAMove(activePlayer.username),
      subHeadingTitle: text.playerTurn.itsTequilaUnderTheBridge,
    };
  }
};

const proceedActions = {
  bid: {
    timerTitle: "",
    headingTitle: "",
    subHeadingTitle: "",
  },
  boloney: {
    timerTitle: text.playerTurn.boloney,
    headingTitle: text.playerTurn.callBoloney,
    subHeadingTitle: text.playerTurn.areYouSureYouWantToCallBoloney,
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
    timerTitle: text.playerTurn.exact,
    headingTitle: text.playerTurn.callExact,
    subHeadingTitle: text.playerTurn.areYouSureYouWantToCallExact,
  },
};

const evaluateResults = {
  bid: {
    timerTitle: "",
    headingTitle: "",
    subHeadingTitle: "",
  },
  boloney: {
    timerTitle: text.match.callBoloney,
    headingTitle: text.playerTurn.letsSeeWhoIsRight,
    subHeadingTitle: text.playerTurn.itsTequilaUnderTheBridge,
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
    subHeadingTitle: text.playerTurn.itsTequilaUnderTheBridge,
  },
};

export const activePlayerTurnData = (action: TurnAction | undefined, steps: TurnActionStep, round: number): PlayerTurnData => {
  switch (steps) {
    case "pickAction":
      return {
        timerTitle: text.match.takeAction,
        headingTitle: text.match.whatsYourNextMove,
        subHeadingTitle: text.match.timeToPickUpAStrategy,
      };
    case "proceedWithAction":
      if (action) return proceedActions[action];
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
