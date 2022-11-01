import { MatchData } from "@heroiclabs/nakama-js";
import { FC, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { LineContainer, TopNavigation, LobbyPlayer } from "../../components";
import { routes } from "../../navigation";
import { useMatchMaker } from "../../service";
import { useStore } from "../../store";
import { isPlayerRecord, MatchOpCode, Player } from "../../types";
import { parseMatchData, parseMatchIdParam } from "../../util";
import { LobbyWrapper } from "./styles";

export const Lobby: FC = () => {
  const { joinMatch } = useMatchMaker();
  const socket = useStore((state) => state.socket);
  const session = useStore((state) => state.sessionState);
  const [players, setPlayers] = useState<Record<string, Player>>({});

  const { matchId: unparsedId } = useParams();
  const matchId = parseMatchIdParam(unparsedId);

  useEffect(() => {
    if (matchId && session?.username) joinMatch(matchId, { username: session.username });
  }, [joinMatch, matchId, session?.username]);

  // TODO: define these in match service
  useEffect(() => {
    if (!socket) return;

    // TODO: delete logs
    socket.onmatchdata = (matchData: MatchData) => {
      // All opcode related messages from the backend will be received here
      switch (matchData.op_code) {
        // TODO: handle all op codes
        case MatchOpCode.PLAYER_JOINED: {
          const players = parseMatchData(matchData.data);
          console.log("PLAYER_JOINED:", players);
          if (!isPlayerRecord(players)) return;
          setPlayers(players);
          break;
        }
        case MatchOpCode.PLAYER_READY: {
          const players = parseMatchData(matchData.data);
          console.log("READY:", players);
          if (!isPlayerRecord(players)) return;
          setPlayers(players);
          break;
        }
        case MatchOpCode.STAGE_TRANSITION: {
          // TODO: redirect to game route
          console.log("Match Started!");
        }
      }
    };
  }, [joinMatch, session?.username, socket]);

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
