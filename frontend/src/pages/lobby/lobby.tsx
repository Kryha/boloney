import { MatchData, MatchmakerMatched, Presence } from "@heroiclabs/nakama-js";
import { FC, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { LineContainer, TopNavigation, LobbyPlayer } from "../../components";
import { routes } from "../../navigation";
import { useMatchMaker } from "../../service";
import { useAuthState } from "../../store";
import { avatarColorsSchema, avatarNameSchema, MatchOpCode, Player } from "../../types";
import { parseMatchIdParam } from "../../util";
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

  // TODO: define these in a service ?
  useEffect(() => {
    if (!socket) return;

    socket.onmatchmakermatched = (matched: MatchmakerMatched) => {
      const usernames = matched.users.map((user) => user.presence.username);

      let imageIndex = -1;
      const players = usernames.reduce((allUsers, username) => {
        imageIndex++;
        return {
          ...allUsers,
          [username]: {
            username,
            color: avatarColorsSchema.options[imageIndex],
            avatarName: avatarNameSchema.options[imageIndex],
            isConnected: true,
            isReady: false,
          },
        };
      }, {} as Record<string, Player>);

      setPlayers(players);
    };

    socket.onmatchdata = (matchData: MatchData) => {
      // All opcode related messages from the backend will be received here
      if (matchData.op_code === MatchOpCode.READY) {
        // A player has set himself "ready", so we have to reflect that in the client
        const readyUser: Presence = JSON.parse(String.fromCharCode(...matchData.data)); // Yes. This is the way to parse. Gotta love Nakama.
        // TODO: delete console log
        console.log("🚀 ~ file: lobby.tsx ~ line 70 ~ readyUser", readyUser);
        // TODO: Set player as "ready"
        // TODO: continue flow
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
