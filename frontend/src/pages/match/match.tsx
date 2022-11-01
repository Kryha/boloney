import { ReactNode } from "react";

import { text } from "../../assets";
import { EndOfMatch, EndOfRound, GameLayout, GeneralContentWrapper, GetPowerUps, PlayerTurns, Heading2, RollDice } from "../../components";
import { fakePlayers } from "../../service";
import { useMatch } from "../../service/match";
import { useStore } from "../../store";
import { MatchOpCode } from "../../types";

export const Match = () => {
  const { roundStage, sendMatchState, isLoading } = useMatch();
  const powerUps = useStore((state) => state.powerUps);
  const faceValues = useStore((state) => state.faceValues);

  const matchStageReady = () => {
    // TODO: add payload and handle properly
    sendMatchState(MatchOpCode.PLAYER_READY);
  };

  const gameState = (): ReactNode => {
    switch (roundStage) {
      case "getPowerUpStage":
        return <GetPowerUps matchStageReady={matchStageReady} />;
      case "rollDiceStage":
        return <RollDice matchStageReady={matchStageReady} />;
      case "playerTurnLoopStage":
        return <PlayerTurns matchStageReady={matchStageReady} />;
      case "roundSummaryStage":
        return <EndOfRound matchStageReady={matchStageReady} />;
      case "endOfMatchStage":
        return <EndOfMatch matchStageReady={matchStageReady} />;
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
