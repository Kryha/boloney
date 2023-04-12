import { FC } from "react";

import { avatars, DiceCrown } from "../../assets";
import { handProportion } from "../../design";
import { PlayerPublic } from "../../types";
import { Hand } from "../hand";
import { DiceIconWrapper } from "../icons";
import { DiceCrownImg, MatchWinnerWrapper } from "./styles";

interface Props {
  player?: PlayerPublic;
}

export const MatchWinner: FC<Props> = ({ player }) => {
  if (!player) return <></>;

  const speed = handProportion(avatars[player.avatarId].name).speed;

  return (
    <MatchWinnerWrapper>
      <DiceIconWrapper>
        <DiceCrownImg src={DiceCrown} speed={speed} />
      </DiceIconWrapper>
      <Hand avatarName={avatars[player.avatarId].name} isInLobby />
    </MatchWinnerWrapper>
  );
};
