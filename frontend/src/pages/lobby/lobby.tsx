import { FC } from "react";
import { LineContainer, TopNavigation } from "../../components";

import { LobbyPlayer } from "../../components/lobby-player";
import { Players } from "../../service/fake-players";
import { useAuthState } from "../../store";
import { LobbyWrapper } from "./styles";

export const Lobby: FC = () => {
  const { socket } = useAuthState();

  const setReady = () => {
    console.log("ready!");
    socket?.updateStatus;
  };

  return (
    <LobbyWrapper>
      <TopNavigation isInMatch />
      <LineContainer arePlayersReady onClick={setReady}>
        {Players.map((player) => (
          <LobbyPlayer key={player.id} player={player} />
        ))}
      </LineContainer>
    </LobbyWrapper>
  );
};
