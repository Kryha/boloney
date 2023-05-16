import { FC } from "react";
import { CenteredImage } from "../../atoms";
import { AvatarWrapper } from "./styles";

interface Props {
  playerPaint?: string;
  playerAvatar: string;
  playerName?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
}

/**
 * This component is for the player avatar.
 * @param {string} playerPaint - Image of the player paint.
 * @param {string} playerAvatar - Image of the player avatar.
 * @param {string} playerName - player's name
 * @param {string} width - width of the avatar
 * @param {string} height - height of the avatar
 * @param {string} maxWidth - maximum width of the player avatar
 */

export const PlayerAvatar: FC<Props> = ({ playerAvatar, playerPaint, playerName = "avatar", width, height, maxWidth }) => {
  return (
    <AvatarWrapper justifyContent="center" height={height}>
      <CenteredImage height={height} width={width} src={playerAvatar} alt={playerName} maxWidth={maxWidth} />
      <CenteredImage height={height} width={width} src={playerPaint} alt={playerName} maxWidth={maxWidth} />
    </AvatarWrapper>
  );
};
