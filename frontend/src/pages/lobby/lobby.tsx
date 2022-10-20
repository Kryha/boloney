import { Presence } from "@heroiclabs/nakama-js";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { error } from "../../assets/text/error";
import { LineContainer, TopNavigation } from "../../components";

import { LobbyPlayer } from "../../components/lobby-player";
import { MatchOpCode } from "../../constants";
import { routes } from "../../navigation";
import { useAuthState, useMatchMakerState } from "../../store";
import { AvatarColors, AvatarName, Player } from "../../types";
import { LobbyWrapper } from "./styles";

export const Lobby: FC = () => {
  const navigate = useNavigate();
  const socket = useAuthState((state) => state.socket);
  const session = useAuthState((state) => state.sessionState);
  const ticket = useMatchMakerState((state) => state.ticket);
  const matchId = useMatchMakerState((state) => state.matchId);
  const players = useMemo(() => [] as Player[], []);

  if (!socket) throw new Error(error.noSocketConnected);
  if (!session) throw new Error(error.noSessionAvailable);
  if (!ticket) navigate(routes.home);

  // On matchmake event where no match ID is set yet, show loading spinner with "connecting..."" at the bottom until all spots are filled
  // When this is a custom game, you can set the player right after joining the lobby
  useEffect(() => {
    if (!session.username) throw new Error(error.noUsernameFound);
    console.log("first entry");
    // Only add the user once
    console.log(players.find((player) => player.username === session.username));
    const player = addPlayer(session.username);

    // Publish player data to to server so it can update the other players
    if (matchId) {
      socket.sendMatchState(matchId, MatchOpCode.CONNECTED, JSON.stringify(player));
    }
  }, [addPlayer, matchId, players, session.username, socket]);

  socket.onmatchdata = async (matchData) => {
    console.log(matchData.op_code);
    if (matchData.op_code === MatchOpCode.CONNECTED) {
      console.log("CONNECTED PLAYER");
      // Display connected players

      const connectedPlayers = JSON.parse(String.fromCharCode(...matchData.data));
      console.log({ connectedPlayers });
      connectedPlayers.forEach((connectedPlayer: { presence: Presence; isReady: boolean }) => {
        console.log({ connectedPlayer });
        addPlayer(connectedPlayer.presence.username);
      });
    }
  };

  socket.onchannelpresence = async (presence) => {
    // Not sure why, but these do not get picked up on, otherwise I could've addded it to the players array so players can get displayed before the match is made
    console.log({ presence });
  };

  socket.onmatchmakerticket = async (ticket) => {
    // Not sure why, but these do not get picked up on, otherwise I could've addded it to the players array so players can get displayed before the match is made
    console.log({ ticket });
  };

  const addPlayer = useCallback((username: string): Player | void => {
    // Skip if already in the list
    if (players.find((player) => player.username === username)) return;

    const player: Player = {
      username: username,
      color: AvatarColors.options[players.length],
      avatarName: AvatarName.options[players.length],
      isConnected: true,
      isReady: false,
    };

    players.push(player);

    return player;
  });

  const setReady = async () => {
    // Only make this possible once a matchId is set (matchmaker matched), otherwise we can't send an opcode to the backend state
    if (!matchId) return;
    console.log("ready!");
    await socket.sendMatchState(matchId, MatchOpCode.READY, "");
  };

  return (
    <LobbyWrapper>
      <TopNavigation isInMatch />
      <LineContainer arePlayersReady onClick={setReady}>
        {players.map((player) => (
          <LobbyPlayer key={player.username} player={player} />
        ))}
      </LineContainer>
    </LobbyWrapper>
  );
};
