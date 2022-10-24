import { MatchData, MatchmakerMatched, Presence } from "@heroiclabs/nakama-js";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { text } from "../../assets";
import { LineContainer, TopNavigation, LobbyPlayer } from "../../components";
import { MatchOpCode } from "../../constants";
import { routes } from "../../navigation";
import { useMatchMaker, fakePlayers } from "../../service";
import { useAuthState, useMatchMakerState } from "../../store";
import { AvatarColors, AvatarName, Player } from "../../types";
import { LobbyWrapper } from "./styles";

export const Lobby: FC = () => {
  const navigate = useNavigate();
  const { joinMatch } = useMatchMaker();
  const socket = useAuthState((state) => state.socket);
  const session = useAuthState((state) => state.sessionState);
  const ticket = useMatchMakerState((state) => state.ticket);
  const matchId = useMatchMakerState((state) => state.matchId);
  const players = useMemo(() => [] as Player[], []);

  if (!socket) throw new Error(text.error.noSocketConnected);
  if (!session) throw new Error(text.error.noSessionAvailable);
  if (!ticket) navigate(routes.home);

  const addPlayer = useCallback(
    (username: string): void => {
      // Skip if the user is already in the list
      if (players.find((player) => player.username === username)) return;

      players.push({
        username,
        color: AvatarColors.options[players.length],
        avatarName: AvatarName.options[players.length],
        isConnected: true,
        isReady: false,
      });
    },
    [players]
  );

  useEffect(() => {
    if (!session.username) throw new Error(text.error.noUsernameFound);
    addPlayer(session.username);
  }, [addPlayer, session.username]);

  socket.onmatchmakermatched = async (matched: MatchmakerMatched) => {
    matched.users.forEach((user) => {
      addPlayer(user.presence.username);
    });

    if (matched.match_id) await joinMatch(matched.match_id);
  };

  socket.onchannelpresence = async (presence) => {
    // Not sure why, but this is not getting picked up on. Otherwise I could've addded the new presence to the players array, so new players can get displayed before the match is made
    console.log({ presence });
  };

  socket.onmatchdata = (matchData: MatchData) => {
    // All opcode related messages from the backend will be received here
    console.log({ matchData });

    if (matchData.op_code === MatchOpCode.READY) {
      // A player has set himself "ready", so we have to reflect that in the client
      const readyUser: Presence = JSON.parse(String.fromCharCode(...matchData.data)); // Yes. This is the way to parse. Gotta love Nakama.
      // TODO: Set player as "ready"
    }
  };

  const setReady = async () => {
    // Only make this possible once a matchId is set (matchmaker matched), otherwise we can't send an opcode to the backend state
    if (matchId) await socket.sendMatchState(matchId, MatchOpCode.READY, "");
  };

  return (
    <LobbyWrapper>
      <TopNavigation isInMatch />
      <LineContainer arePlayersReady onClick={setReady}>
        {fakePlayers.map((player) => (
          <LobbyPlayer key={player.username} player={player} />
        ))}
      </LineContainer>
    </LobbyWrapper>
  );
};
