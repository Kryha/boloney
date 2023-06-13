import { FC } from "react";

import { avatars } from "../../assets/local-data/avatar";
import { BaseRow, PlayerBox } from "../../atoms";
import { handProportion, images, layoutWidth, sidebarAvatarHeights } from "../../design";
import { PlayerAvatar } from "../../molecules";
import { PlayerBid } from "../../molecules/last-bid";
import { useLatestBid, useLocalPlayer } from "../../service";
import { useStore } from "../../store";
import { Die, PlayerPublic, PowerUpId } from "../../types";
import { filterDice, getDieColor } from "../../util";
import { PlayerBadge } from "../badges";
import { DiceOverview } from "../dice-overview";
import { PowerUpOverview } from "../power-up-overview";
import { PlayerBadgeWrapper, PlayerOverview, HudPlayerWrapper, HudPlayerContainer, PlayerName } from "./styles";

interface HUDProps {
  dice?: Die[];
  powerUpIds?: PowerUpId[];
  player: PlayerPublic;
}

export const HUD: FC<HUDProps> = ({ dice, powerUpIds, player }) => {
  const hasPlayerLost = player.status === "lost";
  const { avatar } = handProportion(hasPlayerLost ? "grave" : avatars[player.avatarId].name);
  const lastBid = useLatestBid();
  const localPlayer = useLocalPlayer();
  const dieColor = getDieColor(player);
  const isPlayerLastBid = lastBid?.userId === player.userId;
  const setPowerUpState = useStore((state) => state.setPowerUpState);
  const lastAction = useStore((state) => state.lastAction);
  const stage = useStore((state) => state.matchStage);
  const { targetPlayerId: targetPlayerId, active: activePowerUp, result: result } = useStore((state) => state.powerUpState);
  const hand = handProportion(avatars[player.avatarId].name);

  const gravePaint = handProportion("grave");
  const playerPaint = player.status === "lost" ? gravePaint.paint : hand.paint;

  if (!localPlayer) return <></>;

  const isTargetable = activePowerUp?.id === "7" && stage === "playerTurnLoopStage";
  const playerDice = result && result.id === "6" ? filterDice(result.data.newRolledDice, dice) : dice;
  const isDisabled = localPlayer.powerUpsAmount <= 1 && activePowerUp?.id === "7";

  const handleSelect = () => {
    setPowerUpState({ targetPlayerId: player.userId });
  };

  return (
    <PlayerOverview isActive={player.isActive}>
      <PlayerBox
        divisors={7}
        active={player.isActive}
        hover={isTargetable && !isDisabled}
        enabled={isTargetable && !isDisabled}
        playerColor={dieColor}
        selected={targetPlayerId === player.userId}
        onClick={() => isTargetable && !isDisabled && handleSelect()}
      >
        <BaseRow justifyContent="space-between">
          <PlayerBadgeWrapper>
            <PlayerBadge player={player} lastAction={lastAction} />
          </PlayerBadgeWrapper>

          <HudPlayerWrapper justifyContent="space-between">
            <HudPlayerContainer justifyContent="center" alignItems="center">
              <PlayerAvatar
                height={sidebarAvatarHeights[6]}
                width={images.auto}
                playerAvatar={avatar}
                playerPaint={playerPaint}
                playerName={avatar}
                maxWidth={layoutWidth.sm}
              />
            </HudPlayerContainer>
            <PlayerName>{player.username}</PlayerName>
          </HudPlayerWrapper>
          {isPlayerLastBid && (
            <PlayerBid playerColor={dieColor} lastBid={lastBid} diceAmount={player.diceAmount} amountOfSidebarPlayers={7} />
          )}
        </BaseRow>
      </PlayerBox>

      <DiceOverview dice={playerDice} dieColor={dieColor} extraDice={player.extraDice} />
      <PowerUpOverview powerUpIds={powerUpIds} isInHud />
    </PlayerOverview>
  );
};
