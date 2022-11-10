import { FC } from "react";
import { avatars } from "../../assets/local-data/avatar";
import { handProportion } from "../../design/hand";

import { Die, Player, PowerUpId } from "../../types";
import { DiceOverview } from "../dice-overview";
import { PlayerAvatar } from "../game-player/styles";
import { PlayerMenu } from "../player-menu";
import { PowerUpOverview } from "../power-up-overview";
import { LocalPlayer, PlayerOverview } from "./styles";

interface HUDProps {
  dice?: Die[];
  powerUpIds?: PowerUpId[];
  localPlayer: Player;
}

export const HUD: FC<HUDProps> = ({ dice, powerUpIds, localPlayer }) => {
  const { avatar } = handProportion(avatars[localPlayer.avatarId].name);
  return (
    <>
      <PlayerOverview>
        <LocalPlayer>
          <PlayerAvatar height="10vh" src={avatar} />
        </LocalPlayer>
        <DiceOverview dice={dice} />
        <PowerUpOverview powerUpIds={powerUpIds} />
      </PlayerOverview>
      <PlayerMenu />
    </>
  );
};
