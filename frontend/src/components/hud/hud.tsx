import { FC } from "react";

import { avatars } from "../../assets/local-data/avatar";
import { handProportion } from "../../design";
import { useLatestBid } from "../../service";
import { useStore } from "../../store";
import { Die, PlayerPublic, PowerUpId } from "../../types";
import { getDieColor } from "../../util";
import { PlayerBadge } from "../badges";
import { DiceOverview } from "../dice-overview";
import { PlayerLastBid } from "../match-players-overview";
import { RadioButton } from "../power-up-checkbox";
import { PowerUpOverview } from "../power-up-overview";
import { LocalPlayer, PlayerAvatar, PlayerOverview } from "./styles";

interface HUDProps {
  dice?: Die[];
  powerUpIds?: PowerUpId[];
  player: PlayerPublic;
}

export const HUD: FC<HUDProps> = ({ dice, powerUpIds, player }) => {
  const { avatar } = player.diceAmount === 0 ? handProportion("grave") : handProportion(avatars[player.avatarId].name);
  const lastBid = useLatestBid();
  const dieColor = getDieColor(player);
  const isPlayerLastBid = lastBid?.userId === player.userId;
  const setPowerUpState = useStore((state) => state.setPowerUpState);
  const { targetPlayerId: targetPlayerId, active: activePowerUp } = useStore((state) => state.powerUpState);

  const isTargetable = activePowerUp?.id === "7";

  const handleSelect = () => {
    setPowerUpState({ targetPlayerId: player.userId });
  };

  return (
    <PlayerOverview isActive={player.isActive}>
      <PlayerBadge player={player} />

      <LocalPlayer isLastBid={isPlayerLastBid}>
        <PlayerAvatar height="10vh" src={avatar} />
        {isTargetable && <RadioButton onSelect={handleSelect} isChecked={targetPlayerId === player.userId} />}
        {isPlayerLastBid && <PlayerLastBid player={player} lastBid={lastBid} />}
      </LocalPlayer>

      <DiceOverview dice={dice} dieColor={dieColor} />
      <PowerUpOverview powerUpIds={powerUpIds} />
    </PlayerOverview>
  );
};
