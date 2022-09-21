import { FC } from "react";
import { Player } from "../../interfaces";
import { Hand } from "../hand";
import { LobbyPlayerStatus } from "../lobby-player-status";
import { LobbyPlayerWrapper } from "./styles";

interface LobbyPlayerProps {
  player: Player;
}

export const LobbyPlayer: FC<LobbyPlayerProps> = ({ player }) => {
  return (
    <LobbyPlayerWrapper isWaiting={player.connected}>
      <Hand key={player.id} avatarName={player.avatarName} name={player.name} />
      <LobbyPlayerStatus playerName={player.name} isWaiting={player.connected} />
    </LobbyPlayerWrapper>
  );
};
