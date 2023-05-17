import { FC } from "react";
import { avatars } from "../../assets";
import { PlayerBox } from "../../atoms";
import { handProportion } from "../../design";
import { PlayerPublic } from "../../types";
import { PlayerAvatar } from "../player-avatar";
import { SidebarPlayerWrapper } from "./styles";

interface Props {
  player: PlayerPublic;
  width?: string;
  height?: string;
  maxWidth?: string;
  isHovered?: boolean;
  amountOfSidebarPlayers: number;
}

/**
 *
 * This is the component for displaying sidebar player.
 * @param {PlayerPublic} player - This is a player in the sidebar
 * @param {string} width - width of the avatar
 * @param {string} height - height of the avatar
 * @param {string} maxWidth - maximum width of the player avatar
 * @param {boolean} isHovered - If a player is hovered in the sidebar
 * @param {number} amountOfSidebarPlayers - The amount of players in the sidebar
 */

export const SideBarPlayer: FC<Props> = ({ player, width, height, maxWidth, amountOfSidebarPlayers, isHovered = false }) => {
  const avatarName = avatars[player.avatarId].name;
  const avatar = handProportion(avatarName);
  return (
    <PlayerBox divisors={amountOfSidebarPlayers} active={player.isActive} hover={isHovered} enabled={isHovered}>
      <SidebarPlayerWrapper justifyContent="center">
        <PlayerAvatar
          height={height}
          width={width}
          playerAvatar={avatar.avatar}
          playerPaint={avatar.paint}
          maxWidth={maxWidth}
          playerName={avatarName}
        />
      </SidebarPlayerWrapper>
      {/* TODO: add player name and dice and power ups */}
    </PlayerBox>
  );
};
