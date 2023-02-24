import { FC } from "react";

import { MatchStateVerticalDivider, MatchStatsContainer } from "../styles";
import { MatchStateItemStage } from "./match-stats-item-phase";
import { MatchStateItemDrawRound } from "./match-stats-item-draw-round";
import { DiceIcon } from "../../icons";
import { color } from "../../../design";
import { useTotalDiceInMatch } from "../../../service";
import { useStore } from "../../../store";

const AMOUNT_OF_POWER_UPS = 1;

export const MatchStats: FC = () => {
  const totalDice = useTotalDiceInMatch();
  const stageNumber = useStore((state) => state.stageNumber);
  const drawRoundCounter = useStore((state) => state.drawRoundCounter);

  return (
    <MatchStatsContainer>
      <DiceIcon diceAmount={totalDice} faceColor={color.white} pipColor={color.black} />
      <MatchStateVerticalDivider />
      <MatchStateItemStage phaseNumber={stageNumber} />
      <MatchStateVerticalDivider />
      <MatchStateItemDrawRound powerUpsAmount={AMOUNT_OF_POWER_UPS} drawRoundCounter={drawRoundCounter} />
    </MatchStatsContainer>
  );
};
