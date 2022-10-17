import { FC } from "react";
import { MatchStateItemDiceAMount } from "./match-stats-item-dice-amount";
import { MatchStateVerticalDivider, MatchStatsContainer } from "../styles";
import { MatchStateItemStage } from "./match-stats-item-phase";
import { MatchStateItemDrawRound } from "./match-stats-item-draw-round";

//TODO: Get this from the game state
const MockState = {
  numberOfDice: 30,
  phaseNumber: 7,
  tillDrawRound: 2,
  amountOfPowerups: 1,
};

export const MatchStats: FC = () => {
  return (
    <MatchStatsContainer>
      <MatchStateItemDiceAMount diceAmount={MockState.numberOfDice} />
      <MatchStateVerticalDivider />
      <MatchStateItemStage phaseNumber={MockState.phaseNumber} />
      <MatchStateVerticalDivider />
      <MatchStateItemDrawRound powerUpAmount={MockState.amountOfPowerups} roundNumber={MockState.tillDrawRound} />
    </MatchStatsContainer>
  );
};
