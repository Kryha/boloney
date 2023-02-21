import { FC } from "react";

import { avatars } from "../../assets/local-data/avatar";
import { handProportion, measurements } from "../../design";
import { useLatestBid, useLocalPlayer } from "../../service";
import { useStore } from "../../store";
import { Die, PlayerPublic, PowerUpId } from "../../types";
import { filterDice, getDieColor } from "../../util";
import { PlayerBadge } from "../badges";
import { DiceOverview } from "../dice-overview";
import { PlayerLastBid } from "../match-players-overview";
import { PlayerNameContainer } from "../match-players-overview/styles";
import { RadioButton } from "../power-up-checkbox";
import { PowerUpOverview } from "../power-up-overview";
import { LocalPlayer, LocalPlayerAvatar, LocalPlayerInfoContainer, PlayerOverview } from "./styles";

interface HUDProps {
  dice?: Die[];
  powerUpIds?: PowerUpId[];
  player: PlayerPublic;
}

export const HUD: FC<HUDProps> = ({ dice, powerUpIds, player }) => {
  const { avatar } = player.diceAmount === 0 ? handProportion("grave") : handProportion(avatars[player.avatarId].name);
  const lastBid = useLatestBid();
  const localPlayer = useLocalPlayer();
  const dieColor = getDieColor(player);
  const isPlayerLastBid = lastBid?.userId === player.userId;
  const setPowerUpState = useStore((state) => state.setPowerUpState);
  const { targetPlayerId: targetPlayerId, active: activePowerUp, result: result } = useStore((state) => state.powerUpState);

  const isTargetable = activePowerUp?.id === "7";
  const playerDice = result && result.id === "6" ? filterDice(result.data.newRolledDice, dice) : dice;

  const handleSelect = () => {
    setPowerUpState({ targetPlayerId: player.userId });
  };

  return (
    <PlayerOverview isActive={player.isActive}>
      <PlayerBadge player={player} />

      <LocalPlayer isLastBid={isPlayerLastBid} onClick={() => isTargetable && handleSelect()} isTargetable={isTargetable}>
        <LocalPlayerAvatar height={measurements.localAvatarHeight} src={avatar} />
        {isTargetable && <RadioButton onSelect={handleSelect} isChecked={targetPlayerId === player.userId} />}
        {isPlayerLastBid && <PlayerLastBid player={player} lastBid={lastBid} />}
        <LocalPlayerInfoContainer>
          <PlayerNameContainer>{localPlayer?.username}</PlayerNameContainer>
        </LocalPlayerInfoContainer>
      </LocalPlayer>

      <DiceOverview dice={playerDice} dieColor={dieColor} extraDice={player.extraDice} />
      <PowerUpOverview powerUpIds={powerUpIds} />
    </PlayerOverview>
  );
};
