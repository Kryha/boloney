import { handleMatchStage } from "../../services";
import { MatchLoopParams, MatchStage } from "../../types";
import { handlePowerUpLogic, handleLogicWithTimer, handleEmptyLogic } from "./logic-handlers";
import {
  handleLobbyMessage,
  handlePlayerTurnMessage,
  handlePowerUpMessage,
  handleReadyMessage,
  handleRollDiceMessage,
} from "./message-handlers";
import { handleBasicTransition, handleLobbyTransition, handleRoundSummaryTransition } from "./transition-handlers";

export type StageHandler = (loopParams: MatchLoopParams) => void;

export type StageHandlers = {
  [stage in MatchStage]: StageHandler;
};

export const handleStage: StageHandlers = {
  lobbyStage: (loopParams) => handleMatchStage(loopParams, handleLobbyMessage, handleEmptyLogic, handleLobbyTransition),

  getPowerUpStage: (loopParams) => handleMatchStage(loopParams, handlePowerUpMessage, handlePowerUpLogic, handleBasicTransition),

  rollDiceStage: (loopParams) => handleMatchStage(loopParams, handleRollDiceMessage, handleLogicWithTimer, handleBasicTransition),

  /*
   * In the turn loop players won't indicate that they are ready.
   * We'll move to the next stage only when the conditions are met.
   * Next stage transition will be triggered by a "round ending" action (exact, boloney, timeout)
   */
  playerTurnLoopStage: (loopParams) => handleMatchStage(loopParams, handlePlayerTurnMessage, handleLogicWithTimer, handleBasicTransition),

  roundSummaryStage: (loopParams) => handleMatchStage(loopParams, handleReadyMessage, handleLogicWithTimer, handleRoundSummaryTransition),

  /**
   * TODO: currently the match terminates after the creator leaves the end of match page
   * TODO: see if there is away to keep it alive while the other players are in the match
   */
  endOfMatchStage: (loopParams) => handleMatchStage(loopParams, handleReadyMessage, handleEmptyLogic),

  // TODO: Add garbage collection logic to end the match
  terminateMatchStage: (loopParams) => loopParams.logger.info("Terminating Match: ", loopParams.ctx.matchId),
};
