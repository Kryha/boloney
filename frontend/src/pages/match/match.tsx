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
import { DiceApp } from "../../components/main/main";
import { routes } from "../../navigation";
import { fakeDiceRolls, fakePlayers, useMatch, useMatchMaker } from "../../service";
import { fakePowerUps } from "../../service/fake-power-ups";
import { useStore } from "../../store";
import { isPlayerOrderObject, isPlayerRecord, isStageTransition, MatchOpCode, MatchStage, Player } from "../../types";
import { parseMatchData, parseMatchIdParam } from "../../util";

export const Match = () => {
  const { joinMatch } = useMatchMaker();
  const { matchStage, isLoading, getOrderedPlayers, handleStageTransition, getLocalPlayer } = useMatch();
  const powerUps = useStore((state) => state.powerUps);
  const faceValues = useStore((state) => state.faceValues);
  const players = useStore((state) => state.players);
  const playersOrder = useStore((state) => state.playerOrder);
  const socket = useStore((state) => state.socket);
  const session = useStore((state) => state.sessionState);
  const setMatchStage = useStore((state) => state.setMatchStage);
  const setPlayers = useStore((state) => state.setPlayers);
  const setPlayerOrder = useStore((state) => state.setPlayerOrder);

  // TODO: Check if we need to re-stablish socket connection after reloading the page
  const { matchId: unparsedId } = useParams();
  const matchId = parseMatchIdParam(unparsedId);

  const getStageComponent = (stage: MatchStage, localPlayer: Player): ReactNode => {
    switch (stage) {
      case "getPowerUpStage":
        return <GetPowerUps localPlayer={localPlayer} />;
      case "rollDiceStage":
        return <RollDice localPlayer={localPlayer} />;
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

      // TODO: Add cases for the rest of the OP_CODES
      switch (matchOpcode) {
        case MatchOpCode.STAGE_TRANSITION: {
          const data = parseMatchData(matchData.data);
          const stage: MatchStage = data.matchStage;
          if (!isStageTransition(data)) return;
          setMatchStage(stage);
          handleStageTransition(stage);
          break;
        }
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
    };
  }, [socket, setMatchStage, setPlayerOrder, setPlayers, handleStageTransition]);
  // const results = await diceThrower.throwDice([{ die: Dice.D20 }, { die: Dice.D6, position: new Vector3(2, 2, 2) }]);
  // // TODO: add error page
  // if (!matchId || !session?.user_id) return <Navigate to={routes.home} />;

  // // TODO: add loading animation
  // if (isLoading) return <Heading2>{text.general.loading}</Heading2>;

  // if (matchStage === "lobbyStage") return <Lobby />;
  // // TODO fetching the localPlayer from the global store
  // const localPlayer = getLocalPlayer(players, session.user_id);

  return <DiceApp />;
};
