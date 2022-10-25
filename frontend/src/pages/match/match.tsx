import { ReactNode } from "react";
import { text } from "../../assets";

import { EndOfGame, EndOfRound, GameLayout, GeneralContentWrapper, GetPowerUps, PlayerTurns, Heading2, RollDice } from "../../components";
import { DiceRolls, Players } from "../../service";
import { useMatch } from "../../service/match";
import { useMatchState } from "../../store/match";
import { RoundStage } from "../../types";

export const Match = () => {
  const { roundStage, isLoading } = useMatch();
  const setIsMatchStageReady = useMatchState((state) => state.setIsMatchStageReady);

  const matchStageReady = () => {
    setIsMatchStageReady(true);
  };

  const gameState = (): ReactNode => {
    switch (roundStage) {
      case RoundStage.GET_POWERUP_STAGE:
        return <GetPowerUps matchStageReady={matchStageReady} />;
      case RoundStage.ROLL_DICE_STAGE:
        return <RollDice />;
      case RoundStage.PLAYER_TURN_STAGE:
        return <PlayerTurns />;
      case RoundStage.ROUND_SUMMARY_STAGE:
        return <EndOfRound />;
      case RoundStage.END_OF_MATCH_STAGE:
        return <EndOfGame />;
      default:
        return <GetPowerUps matchStageReady={matchStageReady} />;
    }
  };

  // TODO: add loading animation
  if (isLoading) return <Heading2>{text.general.loading}</Heading2>;

  return (
    <GameLayout players={Players} dice={DiceRolls}>
      <GeneralContentWrapper>{gameState()}</GeneralContentWrapper>
    </GameLayout>
  );
};
