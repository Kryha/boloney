import { MatchData } from "@heroiclabs/nakama-js";
import { ReactNode, useEffect } from "react";

import { text } from "../../assets";
import { EndOfMatch, EndOfRound, GameLayout, GeneralContentWrapper, GetPowerUps, PlayerTurns, Heading2, RollDice } from "../../components";
import { fakeDiceRolls, useMatch, fakeLocalPlayer } from "../../service";
import { fakePowerUps } from "../../service/fake-power-ups";
import { useStore } from "../../store";
import { isStageTransition, MatchOpCode, MatchStage } from "../../types";
import { parseMatchData } from "../../util";

export const Match = () => {
  const { matchStage, sendMatchState, getOrderedPlayers, isLoading } = useMatch();
  const powerUps = useStore((state) => state.powerUps);
  const faceValues = useStore((state) => state.faceValues);
  const players = useStore((state) => state.players);
  const playersOrder = useStore((state) => state.playerOrder);
  const socket = useStore((state) => state.socket);
  const setPowerUps = useStore((state) => state.setPowerUps);
  const setFaceValues = useStore((state) => state.setFaceValues);
  const setMatchStage = useStore((state) => state.setMatchStage);

  const matchStageReady = () => {
    // TODO: add payload and handle properly
    sendMatchState(MatchOpCode.PLAYER_READY);
  };

  const getStageComponent = (stage: string): ReactNode => {
    switch (stage) {
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

  useEffect(() => {
    if (!socket) return;

    socket.onmatchdata = (matchData: MatchData) => {
      const payload = parseMatchData(matchData.data);

      if (matchData.op_code === MatchOpCode.STAGE_TRANSITION) {
        if (!isStageTransition(payload)) return;

        setMatchStage(payload.matchStage as MatchStage);

        switch (payload.matchStage) {
          case "getPowerUpStage":
            // TODO: remove fake data
            setPowerUps(fakePowerUps);
            break;
          case "rollDiceStage":
            // TODO: remove fake data
            setFaceValues(fakeDiceRolls);
            break;
          case "playerTurnLoopStage":
            // TODO: add other stages
            break;
          case "roundSummaryStage":
            break;
          case "endOfMatchStage":
            break;
        }
      }
    };
  }, [matchStage, setFaceValues, setPowerUps, setMatchStage, socket]);

  // TODO: add loading animation
  if (isLoading) return <Heading2>{text.general.loading}</Heading2>;

  // TODO: Remove fakeActivePlayer
  return (
    <GameLayout players={getOrderedPlayers(players, playersOrder)} dice={faceValues} powerUps={powerUps} localPlayer={fakeLocalPlayer}>
      <GeneralContentWrapper>{getStageComponent(matchStage)}</GeneralContentWrapper>
    </GameLayout>
  );
};
