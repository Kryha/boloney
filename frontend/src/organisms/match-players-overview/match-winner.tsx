import { FC } from "react";

import { avatars, DiceCrown } from "../../assets";
import { BaseRow } from "../../atoms";
import { getDieColor } from "../../util";
import { handProportion } from "../../design";
import { FloatingPlayer } from "../../molecules";
import { PlayerPublic } from "../../types";
import { DiceCrownImg, MatchWinnerWrapper } from "./styles";

interface Props {
  player?: PlayerPublic;
}

/**
 *
 * This is the component for displaying the match winner at the end of the match.
 * @param {PlayerPublic} player - This is the player who has won the match.
 */

export const MatchWinner: FC<Props> = ({ player }) => {
  if (!player) return <></>;

  const speed = handProportion(avatars[player.avatarId].name).speed;
  const playerColor = getDieColor(player);

  return (
    <MatchWinnerWrapper playerColor={playerColor} selected={false}>
      <BaseRow alignItems="center" justifyContent="center">
        <DiceCrownImg src={DiceCrown} speed={speed} />
      </BaseRow>
      <FloatingPlayer avatarName={avatars[player.avatarId].name} />
    </MatchWinnerWrapper>
  );
};
