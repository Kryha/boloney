import { FC } from "react";

import { avatars } from "../../assets";
import { ContentLoader } from "../../components";
import { avatarHeight, LOBBY_MAX_HEIGHT } from "../../design";
import { PlayerPublic } from "../../types";
import { getLobbyMaxWidth } from "../../util";
import { FloatingPlayer } from "../floating-player";
import { LobbyStatus } from "../lobby-status";
import { LobbyPlayerContainer, LobbyPlayerWrapper } from "./styles";

interface LobbyPlayerProps {
  player: PlayerPublic;
  totalPlayers: number;
}

/**
 *
 * This is the component for displaying a player in the lobby to display their avatars.
 * @param {PlayerPublic} player - This is a players in the lobby
 * @param {number} totalPlayers - This is the total amount of players.
 */

export const LobbyPlayer: FC<LobbyPlayerProps> = ({ player, totalPlayers }) => {
  const maxWidth = LOBBY_MAX_HEIGHT / totalPlayers;
  //This is needs to be here for the quick match option
  if (!player.avatarId) return <ContentLoader isLoading />;

  return (
    <LobbyPlayerWrapper justifyContent="space-between">
      <LobbyPlayerContainer isWaiting={!player.isReady} alignItems="center" justifyContent="center">
        <FloatingPlayer
          avatarName={avatars[player.avatarId].name}
          height={avatarHeight.md}
          width="auto"
          maxWidth={getLobbyMaxWidth(maxWidth)}
        />
      </LobbyPlayerContainer>
      <LobbyStatus playerName={player.username} isWaiting={!player.isConnected} isReady={player.isReady} />
    </LobbyPlayerWrapper>
  );
};
