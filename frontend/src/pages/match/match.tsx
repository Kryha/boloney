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
import { useMatch, useMatchMaker } from "../../service";
import { useStore } from "../../store";
import { isPlayerOrderObject, isPlayerRecord, isStageTransition, MatchOpCode, MatchStage, powerUpIdArraySchema, Player } from "../../types";
import { parseMatchData, parseMatchIdParam } from "../../util";

export const Match = () => {
  const { joinMatch } = useMatchMaker();
  const { matchStage, isLoading, getOrderedPlayers, handleStageTransition, getLocalPlayer } = useMatch();
  const faceValues = useStore((state) => state.faceValues);
  const players = useStore((state) => state.players);
  const playersOrder = useStore((state) => state.playerOrder);
  const socket = useStore((state) => state.socket);
  const session = useStore((state) => state.sessionState);
  const setMatchStage = useStore((state) => state.setMatchStage);
  const setPlayers = useStore((state) => state.setPlayers);
  const setPlayerOrder = useStore((state) => state.setPlayerOrder);
  const setPlayerPowerUps = useStore((state) => state.setPlayerPowerUps);

  // TODO: Check if we need to re-stablish socket connection after reloading the page
  const { matchId: unparsedId } = useParams();
  const matchId = parseMatchIdParam(unparsedId);

  const getStageComponent = (stage: MatchStage, localPlayer: Player): ReactNode => {
    switch (stage) {
      case "getPowerUpStage":
        return <GetPowerUps localPlayer={localPlayer} />;
      case "rollDiceStage":
        return <RollDice />;
      case "playerTurnLoopStage":
        return <PlayerTurns />;
      case "roundSummaryStage":
        return <EndOfRound />;
      case "endOfMatchStage":
        return <EndOfMatch />;
    }
  };

  useEffect(() => {
    if (matchId && session?.username) joinMatch(matchId, { username: session.username });
  }, [joinMatch, matchId, session?.username]);

  useEffect(() => {
    if (!socket) return;

    socket.onmatchdata = (matchData: MatchData) => {
      const matchOpcode = matchData.op_code;
      const data = parseMatchData(matchData.data);

      // TODO: Add cases for the rest of the OP_CODES
      switch (matchOpcode) {
        case MatchOpCode.STAGE_TRANSITION: {
          const stage: MatchStage = data.matchStage;
          if (!isStageTransition(data)) return;
          setMatchStage(stage);
          handleStageTransition(stage);
          break;
        }
        case MatchOpCode.PLAYER_JOINED: {
          if (!isPlayerRecord(data)) return;
          setPlayers(data);
          break;
        }
        case MatchOpCode.PLAYER_READY: {
          if (!isPlayerRecord(data)) return;
          setPlayers(data);
          break;
        }
        case MatchOpCode.PLAYER_ORDER_SHUFFLE: {
          if (!isPlayerOrderObject(data)) return;
          setPlayerOrder(data.playerOrder);
          break;
        }
        case MatchOpCode.PLAYER_GET_POWERUPS: {
          if (!powerUpIdArraySchema.safeParse(data).success) return;
          if (!session?.user_id) return;
          setPlayerPowerUps(session.user_id, data);
          break;
        }
        case MatchOpCode.PLAYER_ACTIVE: {
          if (!isPlayerRecord(data)) return;
          setPlayers(data);
          break;
        }
      }
    };
  }, [socket, setMatchStage, setPlayerOrder, setPlayers, handleStageTransition, session?.user_id, setPlayerPowerUps]);

  // TODO: add error page
  if (!matchId || !session?.user_id) return <Navigate to={routes.home} />;

  // TODO: add loading animation
  if (isLoading) return <Heading2>{text.general.loading}</Heading2>;

  if (matchStage === "lobbyStage") return <Lobby />;
  // TODO fetching the localPlayer from the global store
  const localPlayer = getLocalPlayer(players, session.user_id);

  //TODO: Redirect to error page
  if (!players[session.user_id]) return <></>;

  return (
    <GameLayout
      players={getOrderedPlayers(players, playersOrder)}
      dice={faceValues}
      powerUpIds={players[session.user_id].powerUpIds}
      localPlayer={localPlayer}
    >
      <GeneralContentWrapper>{getStageComponent(matchStage, localPlayer)}</GeneralContentWrapper>
    </GameLayout>
  );
};
