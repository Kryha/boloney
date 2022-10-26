import { MatchData } from "@heroiclabs/nakama-js";
import { FC, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { LineContainer, TopNavigation, LobbyPlayer } from "../../components";
import { routes } from "../../navigation";
import { useMatchMaker } from "../../service";
import { useAuthState } from "../../store";
import { isPlayerRecord, MatchOpCode, Player } from "../../types";
import { parseMatchData, parseMatchIdParam } from "../../util";
import { LobbyWrapper } from "./styles";

export const Lobby: FC = () => {
  const { joinMatch } = useMatchMaker();
  const socket = useAuthState((state) => state.socket);
  const session = useAuthState((state) => state.sessionState);
  const [players, setPlayers] = useState<Record<string, Player>>({});

  const { matchId: unparsedId } = useParams();
  const matchId = parseMatchIdParam(unparsedId);

  useEffect(() => {
    if (matchId && session?.username) joinMatch(matchId, { username: session.username });
  }, [joinMatch, matchId, session?.username]);

  // TODO: define these in a service
  useEffect(() => {
    if (!socket) return;

    // TODO: delete logs
    socket.onmatchdata = (matchData: MatchData) => {
      // All opcode related messages from the backend will be received here
      switch (matchData.op_code) {
        // TODO: handle all op codes
        case MatchOpCode.USER_JOINED: {
          const players = parseMatchData(matchData.data);
          console.log("USER_JOINED:", players);
          if (!isPlayerRecord(players)) return;
          setPlayers(players);
          break;
        }
        case MatchOpCode.READY: {
          const players = parseMatchData(matchData.data);
          console.log("READY:", players);
          if (!isPlayerRecord(players)) return;
          setPlayers(players);
          break;
        }
        case MatchOpCode.MATCH_START: {
          console.log("Match Started!");
        }
      }
    };
  }, [joinMatch, session?.username, socket]);

  if (!matchId) return <Navigate to={routes.home} />;

  const setReady = () => {
    if (matchId) socket?.sendMatchState(matchId, MatchOpCode.READY, "");
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
