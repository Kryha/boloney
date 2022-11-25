import { FC } from "react";

import { LobbyWrapper } from "./styles";
import { LineContainer } from "../line-container";
import { LobbyPlayer } from "../lobby-player";
import { TopNavigation } from "../top-navigation";
import { useLocalPlayer, useMatch, useOrderedPlayers } from "../../service";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";

export const Lobby: FC = () => {
  const { broadcastPlayerReady } = useMatch();

  const players = useOrderedPlayers();
  const localPlayer = useLocalPlayer();
  const matchStage = useStore((state) => state.matchStage);

  if (!localPlayer) return <ErrorView />;

  return (
    <LobbyWrapper>
      <TopNavigation isInMatch={matchStage !== "endOfMatchStage"} />
      <LineContainer isPlayerReady={localPlayer.isReady} onClick={broadcastPlayerReady}>
        {players.map((player) => (
          <LobbyPlayer key={player.username} player={player} />
        ))}
      </LineContainer>
    </LobbyWrapper>
  );
};
