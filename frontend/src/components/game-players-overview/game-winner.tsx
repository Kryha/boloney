import { FC } from "react";

import { avatars, DiceCrown } from "../../assets";
import { PlayerPublic } from "../../types";
import { Hand } from "../hand";
import { DiceIconWrapper } from "../icons/styles";
import { DiceCrownImg, GameWinnerWrapper } from "./styles";

interface Props {
  player: PlayerPublic;
}

export const GameWinner: FC<Props> = ({ player }) => {
  return (
    <GameWinnerWrapper>
      <DiceIconWrapper>
        <DiceCrownImg src={DiceCrown} />
      </DiceIconWrapper>
      <Hand avatarName={avatars[player.avatarId].name} isInLobby />
    </GameWinnerWrapper>
  );
};
