import { ReactNode } from "react";
import { text } from "../../assets";

import { EndOfGame, EndOfRound, GameLayout, GeneralContentWrapper, GetPowerUps, PlayerTurns, Heading2, RollDice } from "../../components";
import { DiceRolls, Players } from "../../service";
import { useSocket } from "../../service/socket";
import { RoundStage } from "../../types";

export const Match = () => {
  const { roundStage } = useSocket();

  const gameState = (): ReactNode => {
    switch (roundStage) {
      case RoundStage.GET_POWERUP_STAGE:
        return <GetPowerUps getPowerUps={getPowerUps} />;
      case RoundStage.ROLL_DICE_STAGE:
        return <RollDice />;
      case RoundStage.PLAYER_TURN_STAGE:
        return <PlayerTurns />;
      case RoundStage.ROUND_SUMMARY_STAGE:
        return <EndOfRound />;
      case RoundStage.END_OF_MATCH_STAGE:
        return <EndOfGame />;
      default:
        return <GetPowerUps getPowerUps={getPowerUps} />;
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
