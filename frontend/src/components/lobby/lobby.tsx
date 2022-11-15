import { FC } from "react";
import { LobbyWrapper } from "./styles";
import { LineContainer } from "../line-container";
import { LobbyPlayer } from "../lobby-player";
import { TopNavigation } from "../top-navigation";
import { useMatch } from "../../service";
import { useStore } from "../../store";
import { Player } from "../../types";

interface LobbyProps {
  localPlayer: Player;
}

export const Lobby: FC<LobbyProps> = ({ localPlayer }) => {
  const { broadcastPlayerReady } = useMatch();
  const players = useStore((state) => state.players);

  return (
    <LobbyWrapper>
      <TopNavigation />
      <LineContainer isPlayerReady={localPlayer.isReady} onClick={broadcastPlayerReady}>
        {Object.values(players).map((player) => (
          <LobbyPlayer key={player.username} player={player} />
        ))}
      </LineContainer>
    </LobbyWrapper>
  );
};
