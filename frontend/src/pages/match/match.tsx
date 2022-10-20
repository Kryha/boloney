import { ReactNode } from "react";
import { text } from "../../assets";

import { EndOfGame, EndOfRound, GameLayout, GeneralContentWrapper, GetPowerUps, PlayerTurns, Heading2, RollDice } from "../../components";
import { DiceRolls, Players } from "../../service";
import { useMatch } from "../../service/match";
import { useMatchState } from "../../store";
import { GET_POWERUPS_OP_CODE, ROLL_DICE_OP_CODE, PLAYER_TURN_OP_CODE, END_OF_ROUND_OP_CODE, END_OF_GAME_OP_CODE } from "../../constants";

export const Match = () => {
  const { getPowerUps, isLoading } = useMatch();
  const roundPhase = useMatchState((state) => state.roundPhase);

  const gameState = (): ReactNode => {
    switch (roundPhase) {
      case GET_POWERUPS_OP_CODE:
        return <GetPowerUps getPowerUps={getPowerUps} />;
      case ROLL_DICE_OP_CODE:
        return <RollDice />;
      case PLAYER_TURN_OP_CODE:
        return <PlayerTurns />;
      case END_OF_ROUND_OP_CODE:
        return <EndOfRound />;
      case END_OF_GAME_OP_CODE:
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
