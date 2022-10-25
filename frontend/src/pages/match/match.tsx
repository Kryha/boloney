import { ReactNode } from "react";

import { text } from "../../assets";
import { EndOfGame, EndOfRound, GameLayout, GeneralContentWrapper, GetPowerUps, PlayerTurns, Heading2, RollDice } from "../../components";
import { fakePlayers } from "../../service";
import { useMatch } from "../../service/match";
import { useMatchState } from "../../store/match";

export const Match = () => {
  const { roundStage, sendMatchState, isLoading } = useMatch();
  const powerUps = useMatchState((state) => state.powerUps);
  const faceValues = useMatchState((state) => state.faceValues);

  const matchStageReady = () => {
    // TODO: add payload
    sendMatchState("");
  };

  const gameState = (): ReactNode => {
    switch (roundStage) {
      case "getPowerUpStage":
        return <GetPowerUps matchStageReady={matchStageReady} />;
      case "rollDiceStage":
        return <RollDice />;
      case "playerTurnLoopStage":
        return <PlayerTurns />;
      case "roundSummaryStage":
        return <EndOfRound />;
      case "endOfMatchStage":
        return <EndOfGame />;
    }
  };

  // TODO: add loading animation
  if (isLoading) return <Heading2>{text.general.loading}</Heading2>;

  // TODO: remove fake players
  return (
    <GameLayout players={fakePlayers} dice={faceValues} powerUps={powerUps}>
      <GeneralContentWrapper>{gameState()}</GeneralContentWrapper>
    </GameLayout>
  );
};
