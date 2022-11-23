import { MatchStage } from "../types";

const STAGES_WITH_HUD: MatchStage[] = ["getPowerUpStage", "playerTurnLoopStage", "rollDiceStage", "roundSummaryStage"];

export const isStageWithHUD = (stage: MatchStage): boolean => STAGES_WITH_HUD.includes(stage);
