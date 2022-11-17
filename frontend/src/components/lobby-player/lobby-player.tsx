import { FC } from "react";
import { avatars } from "../../assets";

import { PlayerPublic } from "../../types";
import { Hand } from "../hand";
import { LobbyPlayerStatus } from "../lobby-player-status";
import { LobbyPlayerWrapper } from "./styles";

interface LobbyPlayerProps {
  player: PlayerPublic;
}

export const LobbyPlayer: FC<LobbyPlayerProps> = ({ player }) => {
  //This is needs to be here for the quick match option
  // TODO: add a proper loader
  if (!player.avatarId) return <>Loading</>;
  return (
    <LobbyPlayerWrapper isWaiting={!player.isReady}>
      <Hand key={player.username} avatarName={avatars[player.avatarId].name} name={player.username} isInLobby />
      <LobbyPlayerStatus playerName={player.username} isWaiting={!player.isConnected} isReady={player.isReady} />
    </LobbyPlayerWrapper>
  );
};
