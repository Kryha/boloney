import { MatchData } from "@heroiclabs/nakama-js";
import { FC, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { LineContainer, TopNavigation, LobbyPlayer } from "../../components";
import { routes } from "../../navigation";
import { useMatchMaker } from "../../service";
import { useStore } from "../../store";
import { isPlayerOrderObject, isPlayerRecord, MatchOpCode } from "../../types";
import { parseMatchData, parseMatchIdParam } from "../../util";
import { LobbyWrapper } from "./styles";

export const Lobby: FC = () => {
  const navigate = useNavigate();
  const { joinMatch } = useMatchMaker();
  const socket = useStore((state) => state.socket);
  const session = useStore((state) => state.sessionState);
  const players = useStore((state) => state.players);
  const setPlayers = useStore((state) => state.setPlayers);
  const setPlayerOrder = useStore((state) => state.setPlayerOrder);

  const { matchId: unparsedId } = useParams();
  const matchId = parseMatchIdParam(unparsedId);

  useEffect(() => {
    if (matchId && session?.username) joinMatch(matchId, { username: session.username });
  }, [joinMatch, matchId, session?.username]);

  // TODO: define these in match service
  useEffect(() => {
    if (!socket) return;

    socket.onmatchdata = (matchData: MatchData) => {
      // All opcode related messages from the backend will be received here
      switch (matchData.op_code) {
        // TODO: handle all op codes
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
        case MatchOpCode.STAGE_TRANSITION: {
          navigate(routes.match);
        }
      }
    };
  }, [joinMatch, navigate, session?.username, setPlayerOrder, setPlayers, socket]);

  if (!matchId) return <Navigate to={routes.home} />;

  const setReady = () => {
    if (matchId) socket?.sendMatchState(matchId, MatchOpCode.PLAYER_READY, "");
  };

  return (
    <LobbyWrapper>
      <TopNavigation isInMatch />
      <LineContainer arePlayersReady onClick={setReady}>
        {Object.values(players).map((player) => (
          <LobbyPlayer key={player.username} player={player} />
        ))}
      </LineContainer>
    </LobbyWrapper>
  );
};
