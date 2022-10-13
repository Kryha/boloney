import { FC } from "react";
import { LineContainer, TopNavigation } from "../../components";

import { LobbyPlayer } from "../../components/lobby-player";
import { Players } from "../../service/fake-players";
import { LobbyWrapper } from "./styles";

export const Lobby: FC = () => {
  // TODO: integrate
  const startGame = () => {
    // TODO: send to backend
    console.log("start game");
  };

  return (
    <LobbyWrapper>
      <TopNavigation isInGame />
      <LineContainer playersReady onClick={startGame}>
        {Players.map((player) => (
          <LobbyPlayer key={player.id} player={player} />
        ))}
      </LineContainer>
    </LobbyWrapper>
  );
};
