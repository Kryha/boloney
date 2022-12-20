import { FC } from "react";

import { avatars, DiceCrown } from "../../assets";
import { PlayerPublic } from "../../types";
import { Hand } from "../hand";
import { DiceIconWrapper } from "../icons/styles";
import { DiceCrownImg, MatchWinnerWrapper } from "./styles";

interface Props {
  player?: PlayerPublic;
}

export const MatchWinner: FC<Props> = ({ player }) => {
  if (!player) return <></>;

  return (
    <MatchWinnerWrapper>
      <DiceIconWrapper>
        <DiceCrownImg src={DiceCrown} />
      </DiceIconWrapper>
      <Hand avatarName={avatars[player.avatarId].name} isInLobby />
    </MatchWinnerWrapper>
  );
};
