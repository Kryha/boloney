import { MatchStage } from "./match";
import { isNumber } from "./primitive";

export const isMatchStageDuration = (value: unknown): value is Record<MatchStage, number> => {
  const assertedVal = value as Record<MatchStage, number>;
  return (
    assertedVal.lobbyStage !== undefined &&
    assertedVal.getPowerUpStage !== undefined &&
    assertedVal.rollDiceStage !== undefined &&
    assertedVal.playerTurnLoopStage !== undefined &&
    assertedVal.roundSummaryStage !== undefined &&
    assertedVal.endOfMatchStage !== undefined &&
    assertedVal.terminateMatchStage !== undefined &&
    isNumber(assertedVal.lobbyStage) &&
    isNumber(assertedVal.getPowerUpStage) &&
    isNumber(assertedVal.rollDiceStage) &&
    isNumber(assertedVal.playerTurnLoopStage) &&
    isNumber(assertedVal.roundSummaryStage) &&
    isNumber(assertedVal.endOfMatchStage) &&
    isNumber(assertedVal.terminateMatchStage)
  );
};
