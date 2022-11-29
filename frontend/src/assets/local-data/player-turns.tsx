// TODO: update file with with different actions
import { PlayerPublic, TurnAction, TurnActionStep } from "../../types";
import { getNumberWithOrdinal } from "../../util";
import { text } from "../text";

interface PlayerTurnData {
  timerTitle: string;
  headingTitle?: string;
  subHeadingTitle?: string;
}

export const passivePlayerTurnData = (steps: TurnActionStep, activePlayer: PlayerPublic): PlayerTurnData => {
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
    subHeadingTitle: text.param.areYouSureYouWantToCallBoloney("meired"),
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
    timerTitle: "",
    headingTitle: "",
    subHeadingTitle: "",
  },
};

const actionResults = {
  bid: {
    timerTitle: "",
    headingTitle: "",
    subHeadingTitle: "",
  },
  boloney: {
    timerTitle: text.param.endOfRound(getNumberWithOrdinal(1)),
    headingTitle: "",
    subHeadingTitle: "",
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
    timerTitle: "",
    headingTitle: "",
    subHeadingTitle: "",
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
    timerTitle: "",
    headingTitle: "",
    subHeadingTitle: "",
  },
};

export const activePlayerTurnData = (action: TurnAction | undefined, steps: TurnActionStep): PlayerTurnData => {
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
      if (action) return actionResults[action];
      return {
        timerTitle: "",
        headingTitle: "",
        subHeadingTitle: "",
      };
  }
};
