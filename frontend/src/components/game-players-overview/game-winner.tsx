import { FC } from "react";

import { avatars } from "../../assets";
import { PlayerPublic } from "../../types";
import { Hand } from "../hand";
import { GameWinnerWrapper } from "./styles";

interface Props {
  player: PlayerPublic;
}

export const GameWinner: FC<Props> = ({ player }) => {
  return (
    <GameWinnerWrapper>
      {/* TODO: add crown */}
      <Hand avatarName={avatars[player.avatarId].name} isInLobby />
    </GameWinnerWrapper>
  );
};
