import { FC } from "react";

import { Player } from "../../types";
import { Hand } from "../hand";
import { LobbyPlayerStatus } from "../lobby-player-status";
import { LobbyPlayerWrapper } from "./styles";

interface LobbyPlayerProps {
  player: Player;
}

export const LobbyPlayer: FC<LobbyPlayerProps> = ({ player }) => {
  return (
    <LobbyPlayerWrapper isWaiting={player.isConnected}>
      <Hand key={player.username} avatarName={player.avatarName} name={player.username} />
      <LobbyPlayerStatus playerName={player.username} isWaiting={!player.isConnected} isReady={player.isReady} />
    </LobbyPlayerWrapper>
  );
};
