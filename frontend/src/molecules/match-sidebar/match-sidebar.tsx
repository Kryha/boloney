import { FC } from "react";
import { Sidebar } from "../../atoms";
import { images, layoutWidth } from "../../design";
import { sidebarAvatarHeights } from "../../design/avatar";
import { PlayerPublic } from "../../types";
import { SideBarPlayer } from "../sidebar-player";

interface Props {
  players: PlayerPublic[];
  isHovered?: boolean;
}

/**
 *
 * This is the component for displaying players in the lobby to display their avatars.
 * @param {PlayerPublic} players - This is an array of the players in the lobby
 * @param {boolean} isHovered - If a player is hovered in the sidebar
 */

export const MatchSideBar: FC<Props> = ({ players, isHovered }) => {
  const totalPlayers = players.length;
  const amountOfSidebarPlayers = totalPlayers - 1;

  return (
    <Sidebar>
      {players.map((player) => (
        <SideBarPlayer
          key={player.userId}
          player={player}
          height={sidebarAvatarHeights[amountOfSidebarPlayers]}
          width={images.auto}
          maxWidth={layoutWidth.sm}
          amountOfSidebarPlayers={totalPlayers}
          isHovered={isHovered}
        />
      ))}
    </Sidebar>
  );
};
