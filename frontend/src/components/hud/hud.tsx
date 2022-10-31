import { FC } from "react";
import { handProportion } from "../../design/hand";

import { Die, Player, PowerUp } from "../../types";
import { DiceOverview } from "../dice-overview";
import { PlayerAvatar } from "../game-player/styles";
import { PlayerMenu } from "../player-menu";
import { PowerUpOverview } from "../power-up-overview";
import { CurrentPlayer, PlayerOverview } from "./styles";

interface HUDProps {
  dice?: Die[];
  powerUp?: PowerUp[];
  currentPlayer: Player;
}

export const HUD: FC<HUDProps> = ({ dice, powerUp, currentPlayer }) => {
  const { avatar } = handProportion(currentPlayer.avatarName);
  return (
    <>
      <PlayerOverview>
        <CurrentPlayer>
          <PlayerAvatar height={"10vh"} playersAmount={0} src={avatar} />
        </CurrentPlayer>
        <DiceOverview dice={dice} />
        <PowerUpOverview powerUps={powerUp} />
      </PlayerOverview>
      <PlayerMenu />
    </>
  );
};
