import { FC, useEffect } from "react";

import { LobbyWrapper } from "./styles";
import { LineContainer } from "../line-container";
import { LobbyPlayer } from "../lobby-player";
import { TopNavigation } from "../top-navigation";
import { useLocalPlayer, useMatch, useOrderedPlayers } from "../../service";
import { ErrorView } from "../error-view";
import { useParams } from "react-router-dom";
import { parseMatchIdParam } from "../../util";
import { useStore } from "../../store";

export const Lobby: FC = () => {
  const { broadcastPlayerReady } = useMatch();

  const { matchId: unparsedId } = useParams();
  const setMatchId = useStore((state) => state.setMatchId);

  useEffect(() => {
    const matchId = parseMatchIdParam(unparsedId);
    setMatchId(matchId || "");
  });

  const players = useOrderedPlayers();
  const localPlayer = useLocalPlayer();

  if (!localPlayer) return <ErrorView />;

  return (
    <LobbyWrapper>
      <TopNavigation />
      <LineContainer isPlayerReady={localPlayer.isReady} onClick={broadcastPlayerReady}>
        {players.map((player) => (
          <LobbyPlayer key={player.username} player={player} />
        ))}
      </LineContainer>
    </LobbyWrapper>
  );
};
