import { FC } from "react";

import { LobbyWrapper } from "./styles";
import { LineContainer } from "../line-container";
import { LobbyPlayer } from "../lobby-player";
import { TopNavigation } from "../top-navigation";
import { useMatch, useOrderedPlayers } from "../../service";
import { useStore } from "../../store";
import { FadeTransition } from "../page-transition";

export const Lobby: FC = () => {
  const { broadcastPlayerReady } = useMatch();
  const setPlayerReady = useStore((state) => state.setPlayerReady);
  const isPlayerReady = useStore((state) => state.isPlayerReady);

  const players = useOrderedPlayers();

  const handleClick = () => {
    broadcastPlayerReady();
    setPlayerReady(true);
  };

  return (
    <FadeTransition>
      <LobbyWrapper>
        <TopNavigation location={"lobby"} />
        <LineContainer isPlayerReady={isPlayerReady} onClick={handleClick}>
          {players.map((player) => (
            <LobbyPlayer key={player.username} player={player} />
          ))}
        </LineContainer>
      </LobbyWrapper>
    </FadeTransition>
  );
};
