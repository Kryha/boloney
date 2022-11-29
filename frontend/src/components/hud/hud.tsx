import { FC } from "react";

import { avatars } from "../../assets/local-data/avatar";
import { handProportion } from "../../design";
import { Die, PlayerPublic, PowerUpId } from "../../types";
import { LoserBadge, WinnerBadge } from "../badges/badges";
import { DiceOverview } from "../dice-overview";
import { PowerUpOverview } from "../power-up-overview";
import { LocalPlayer, PlayerAvatar, PlayerOverview } from "./styles";

interface HUDProps {
  dice?: Die[];
  powerUpIds?: PowerUpId[];
  player: PlayerPublic;
}

export const HUD: FC<HUDProps> = ({ dice, powerUpIds, player }) => {
  const { avatar } = handProportion(avatars[player.avatarId].name);
  // TODO: remove fake value
  const isWinner = false;
  const isLoser = false;
  return (
    <PlayerOverview isActive={player.isActive}>
      {isWinner && <WinnerBadge />}
      {isLoser && <LoserBadge />}
      <LocalPlayer>
        <PlayerAvatar height="10vh" src={avatar} />
      </LocalPlayer>
      <DiceOverview dice={dice} />
      <PowerUpOverview powerUpIds={powerUpIds} />
    </PlayerOverview>
  );
};
