import { FC } from "react";
import { avatars } from "../../assets";
import { HUDPlayerBox } from "../../atoms";
import { handProportion, images, layoutWidth } from "../../design";
import { sidebarAvatarHeights } from "../../design/avatar";
import { PlayerPublic } from "../../types";
import { PlayerAvatar } from "../player-avatar";
import { HudPlayerWrapper } from "./styles";

interface Props {
  player: PlayerPublic;
  isHovered?: boolean;
}

/**
 * This component is for the player avatar.
 * @param {PlayerPublic} player - The hud player.
 * @param {boolean} isHovered - A boolean to define if the hud is being hovered.
 */

export const HudPlayer: FC<Props> = ({ player, isHovered = false }) => {
  const avatarName = avatars[player.avatarId].name;
  const avatar = handProportion(avatarName);

  return (
    <HUDPlayerBox active={player.isActive} hover={isHovered} enabled={isHovered}>
      <HudPlayerWrapper justifyContent="center">
        <PlayerAvatar
          height={sidebarAvatarHeights[6]}
          width={images.auto}
          playerAvatar={avatar.avatar}
          playerPaint={avatar.paint}
          maxWidth={layoutWidth.sm}
          playerName={avatarName}
        />
      </HudPlayerWrapper>
    </HUDPlayerBox>
  );
};
