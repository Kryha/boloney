import { handleMatchStage } from "../../services";
import { MatchLoopParams, MatchStage } from "../../types";
import { handleEmptyLogic, handlePowerUpLogic } from "./logic-handlers";
import {
  handleLobbyMessage,
  handlePlayerTurnMessage,
  handlePowerUpMessage,
  handleReadyMessage,
  handleRollDiceMessage,
} from "./message-handlers";
import { handleBasicTransition, handleLobbyTransition, handleSummaryTransition } from "./transition-handlers";

export type StageHandler = (loopParams: MatchLoopParams) => void;

export type StageHandlers = {
  [stage in MatchStage]: StageHandler;
};

export const handleStage: StageHandlers = {
  lobbyStage: (loopParams) => handleMatchStage(loopParams, handleLobbyMessage, handleEmptyLogic, handleLobbyTransition),

  getPowerUpStage: (loopParams) => handleMatchStage(loopParams, handlePowerUpMessage, handlePowerUpLogic, handleBasicTransition),

  rollDiceStage: (loopParams) => handleMatchStage(loopParams, handleRollDiceMessage, handleEmptyLogic, handleBasicTransition),

  /*
   * In the turn loop players won't indicate that they are ready.
   * We'll move to the next stage only when the conditions are met.
   * Next stage transition will be trigger by a "round ending" action (exact, boloney)
   */
  playerTurnLoopStage: (loopParams) => handleMatchStage(loopParams, handlePlayerTurnMessage, handleEmptyLogic, handleBasicTransition),

  roundSummaryStage: (loopParams) => handleMatchStage(loopParams, handleReadyMessage, handleEmptyLogic, handleSummaryTransition),

  // TODO: Add broadcast to inform the client when player has left the match
  endOfMatchStage: (loopParams) => handleMatchStage(loopParams, handleReadyMessage, handleEmptyLogic),

  // TODO: Add garbage collection logic to end the match
  terminateMatchStage: (loopParams) => loopParams.logger.info("Terminating Match: ", loopParams.ctx.matchId),
};
