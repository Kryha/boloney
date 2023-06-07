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
  showPowerUpAnimation?: boolean;
}

/**
 * This component is for the player avatar.
 * @param {PlayerPublic} player - The hud player.
 * @param {boolean} isHovered - A boolean to define if the hud is being hovered.
 * @param {boolean} showPowerUpAnimation - A boolean used to begin the power up animation. The animation occurs when a new power up is added to your hand.
 */

export const HudPlayer: FC<Props> = ({ player, isHovered = false, showPowerUpAnimation = false }) => {
  const avatarName = avatars[player.avatarId].name;
  const avatar = handProportion(avatarName);

  return (
    <HUDPlayerBox active={player.isActive} hover={isHovered} enabled={isHovered} showPowerUpAnimation={showPowerUpAnimation}>
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
