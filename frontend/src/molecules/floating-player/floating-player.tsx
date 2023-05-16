import { FC } from "react";
import { handProportion } from "../../design";
import { AvatarName } from "../../types";
import { PlayerAvatar } from "../player-avatar";
import { FloatingAvatarWrapper, ShadowWrapper } from "./styles";

interface Props {
  avatarName: AvatarName;
  width?: string;
  height?: string;
  maxWidth?: string;
  containerHeight?: string;
}

/**
 * This component is for the floating player avatar.
 * @param {string} avatarName - the name of the players avatar.
 * @param {string} width - width of the avatar
 * @param {string} height - height of the avatar
 * @param {string} maxWidth - maximum width of the player avatar
 * @param {string} containerHeight - the height of the container for the floating avatar (height of avatar + shadow).
 */

export const FloatingPlayer: FC<Props> = ({ avatarName, width, height, containerHeight, maxWidth }) => {
  const avatar = handProportion(avatarName);
  return (
    <FloatingAvatarWrapper speed={avatar.speed} height={containerHeight} width={maxWidth}>
      <PlayerAvatar
        height={height}
        width={width}
        playerAvatar={avatar.avatar}
        playerPaint={avatar.paint}
        maxWidth={maxWidth}
        playerName={avatarName}
      />
      <ShadowWrapper smallWidth={avatar.smallShadowWidth} largeWidth={avatar.largeShadowWidth} speed={avatar.speed} />
    </FloatingAvatarWrapper>
  );
};
