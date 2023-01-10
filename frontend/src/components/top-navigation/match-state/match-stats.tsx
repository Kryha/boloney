import { FC } from "react";
import { MatchStateVerticalDivider, MatchStatsContainer } from "../styles";
import { MatchStateItemStage } from "./match-stats-item-phase";
import { MatchStateItemDrawRound } from "./match-stats-item-draw-round";
import { DiceIcon } from "../../icons";
import { color } from "../../../design";
import { MATCH_STATS_DICE_VALUE } from "../../../constants";

//TODO: Get this from the game state
const MockState = {
  numberOfDice: 30,
  phaseNumber: 7,
  tillDrawRound: 2,
  amountOfPowerUps: 1,
};

export const MatchStats: FC = () => {
  return (
    <MatchStatsContainer>
      <DiceIcon diceAmount={MockState.numberOfDice} faceColor={color.white} pipColor={color.black} diceValue={MATCH_STATS_DICE_VALUE} />
      <MatchStateVerticalDivider />
      <MatchStateItemStage phaseNumber={MockState.phaseNumber} />
      <MatchStateVerticalDivider />
      <MatchStateItemDrawRound powerUpAmount={MockState.amountOfPowerUps} roundNumber={MockState.tillDrawRound} />
    </MatchStatsContainer>
  );
};
