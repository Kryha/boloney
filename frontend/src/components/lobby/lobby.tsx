import { FC } from "react";
import { useMatch } from "../../service";
import { useStore } from "../../store";
import { LobbyWrapper } from "./styles";
import { LineContainer } from "../line-container";
import { LobbyPlayer } from "../lobby-player";
import { TopNavigation } from "../top-navigation";

// TODO: correclty discriminate between local and remote users when merging with Mauro's PR
export const Lobby: FC = () => {
  const { broadcastPlayerReady } = useMatch();
  const players = useStore((state) => state.players);

  return (
    <LobbyWrapper>
      <TopNavigation />
      <LineContainer arePlayersReady onClick={broadcastPlayerReady}>
        {Object.values(players).map((player) => (
          <LobbyPlayer key={player.username} player={player} />
        ))}
      </LineContainer>
    </LobbyWrapper>
  );
};
