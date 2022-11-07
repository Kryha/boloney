import { MatchData } from "@heroiclabs/nakama-js";
import { ReactNode, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import { text } from "../../assets";
import {
  EndOfMatch,
  EndOfRound,
  GameLayout,
  GeneralContentWrapper,
  GetPowerUps,
  PlayerTurns,
  Heading2,
  RollDice,
  Lobby,
} from "../../components";
import { routes } from "../../navigation";
import { fakeDiceRolls, useMatch, fakeLocalPlayer, useMatchMaker } from "../../service";
import { fakePowerUps } from "../../service/fake-power-ups";
import { useStore } from "../../store";
import { isPlayerOrderObject, isPlayerRecord, isStageTransition, MatchOpCode, MatchStage } from "../../types";
import { parseMatchData, parseMatchIdParam } from "../../util";

export const Match = () => {
  const { joinMatch } = useMatchMaker();
  const { matchStage, isLoading, getOrderedPlayers } = useMatch();
  const powerUps = useStore((state) => state.powerUps);
  const faceValues = useStore((state) => state.faceValues);
  const players = useStore((state) => state.players);
  const playersOrder = useStore((state) => state.playerOrder);
  const socket = useStore((state) => state.socket);
  const session = useStore((state) => state.sessionState);
  const setPowerUps = useStore((state) => state.setPowerUps);
  const setFaceValues = useStore((state) => state.setFaceValues);
  const setMatchStage = useStore((state) => state.setMatchStage);
  const setPlayers = useStore((state) => state.setPlayers);
  const setPlayerOrder = useStore((state) => state.setPlayerOrder);
  const { broadcastPlayerReady } = useMatch();

  // TODO: Check if we need to re-stablish socket conection after reloading the page
  const { matchId: unparsedId } = useParams();
  const matchId = parseMatchIdParam(unparsedId);

  const getStageComponent = (stage: string): ReactNode => {
    switch (stage) {
      case "getPowerUpStage":
        return <GetPowerUps matchStageReady={broadcastPlayerReady} />;
      case "rollDiceStage":
        return <RollDice matchStageReady={broadcastPlayerReady} />;
      case "playerTurnLoopStage":
        return <PlayerTurns matchStageReady={broadcastPlayerReady} />;
      case "roundSummaryStage":
        return <EndOfRound matchStageReady={broadcastPlayerReady} />;
      case "endOfMatchStage":
        return <EndOfMatch matchStageReady={broadcastPlayerReady} />;
    }
  };

  useEffect(() => {
    if (matchId && session?.username) joinMatch(matchId, { username: session.username });
  }, [joinMatch, matchId, session?.username]);

  useEffect(() => {
    if (!socket) return;

    socket.onmatchdata = (matchData: MatchData) => {
      const matchOpcode = matchData.op_code;

      if (matchOpcode === MatchOpCode.STAGE_TRANSITION) {
        const data = parseMatchData(matchData.data);
        if (!isStageTransition(data)) return;

        setMatchStage(data.matchStage as MatchStage);

        switch (data.matchStage) {
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
      } else {
        switch (matchOpcode) {
          // TODO: Add cases for the rest of the OP_CODES
          case MatchOpCode.PLAYER_JOINED: {
            const players = parseMatchData(matchData.data);
            if (!isPlayerRecord(players)) return;
            setPlayers(players);
            break;
          }
          case MatchOpCode.PLAYER_READY: {
            const players = parseMatchData(matchData.data);
            if (!isPlayerRecord(players)) return;
            setPlayers(players);
            break;
          }
          case MatchOpCode.PLAYER_ORDER_SHUFFLE: {
            const playerOrder = parseMatchData(matchData.data);
            if (!isPlayerOrderObject(playerOrder)) return;
            setPlayerOrder(playerOrder.playerOrder);
            break;
          }
        }
      }
    };
  }, [socket, setFaceValues, setPowerUps, setMatchStage, setPlayerOrder, setPlayers]);

  if (!matchId) return <Navigate to={routes.home} />;

  // TODO: add loading animation
  if (isLoading) return <Heading2>{text.general.loading}</Heading2>;

  if (matchStage === "lobbyStage") return <Lobby />;

  // TODO: Remove fakeActivePlayer
  return (
    <GameLayout players={getOrderedPlayers(players, playersOrder)} dice={faceValues} powerUps={powerUps} localPlayer={fakeLocalPlayer}>
      <GeneralContentWrapper>{getStageComponent(matchStage)}</GeneralContentWrapper>
    </GameLayout>
  );
};
