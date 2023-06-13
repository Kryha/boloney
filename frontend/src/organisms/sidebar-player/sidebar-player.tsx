import { FC } from "react";

import { avatars } from "../../assets";
import { PlayerBox } from "../../atoms";
import { handProportion } from "../../design";
import { useStore } from "../../store";
import { Bid, PlayerPublic } from "../../types";
import { getDieColor, powerUpRequiresTarget } from "../../util";
import { PlayerBid, PlayerAvatar, PlayerBadge, PowerUpPill } from "../../molecules";
import { PlayerInformation } from "./player-information";

import { PlayerBadgeWrapper, PlayerContainer, PlayerName, PlayerWrapper, SideBarItem, SidebarPlayerWrapper } from "./styles";

interface Props {
  player: PlayerPublic;
  width?: string;
  height?: string;
  maxWidth?: string;
  isHovered?: boolean;
  amountOfSidebarPlayers: number;
  isLastBid?: boolean;
  lastBid?: Bid;
  isPlayerSelected?: boolean;
  active: boolean;
  isPowerUpDisabled?: boolean;
  setActive: (active: boolean) => void;
}

/**
 *
 * This is the component for displaying sidebar player.
 * @param {PlayerPublic} player - This is a player in the sidebar
 * @param {string} width - width of the avatar
 * @param {string} height - height of the avatar
 * @param {string} maxWidth - maximum width of the player avatar
 * @param {boolean} isHovered - If a player is hovered in the sidebar
 * @param {number} amountOfSidebarPlayers - The amount of players in the sidebar
 */

export const SideBarPlayer: FC<Props> = ({
  player,
  width,
  height,
  maxWidth,
  amountOfSidebarPlayers,
  isHovered = false,
  isLastBid = false,
  lastBid,
  isPlayerSelected = false,
  active,
  isPowerUpDisabled,
  setActive,
}) => {
  const hasPlayerLost = player.status === "lost";
  const avatarName = hasPlayerLost ? "grave" : avatars[player.avatarId].name;
  const avatar = handProportion(avatarName);
  const playerColor = getDieColor(player);
  const totalDice = player.diceAmount - player.extraDice;
  const { targetPlayerId: targetPowerUpPlayerId, active: activePowerUp, result } = useStore((state) => state.powerUpState);
  const setPowerUpState = useStore((state) => state.setPowerUpState);
  const stage = useStore((state) => state.matchStage);
  const lastAction = useStore((state) => state.lastAction);
  const playerRoundData = useStore((state) => state.getPlayerRoundData(player.userId));
  const revealedPowerUps = playerRoundData?.powerUps;
  const canBeTargeted =
    player.status !== "lost" && !!activePowerUp && !result && powerUpRequiresTarget(activePowerUp.id) && stage === "playerTurnLoopStage";

  const handleSelect = () => {
    setPowerUpState({ targetPlayerId: player.userId });
  };

  return (
    <PlayerBox
      divisors={amountOfSidebarPlayers}
      active={player.isActive}
      hover={canBeTargeted || isHovered}
      enabled={canBeTargeted || isHovered}
      playerColor={playerColor}
      selected={targetPowerUpPlayerId === player.userId}
      onClick={() => canBeTargeted && handleSelect()}
    >
      <PlayerBadgeWrapper>
        <PlayerBadge player={player} lastAction={lastAction} />
      </PlayerBadgeWrapper>
      <PlayerWrapper justifyContent="space-between">
        <PlayerContainer justifyContent="space-between">
          <SideBarItem>
            <SidebarPlayerWrapper justifyContent="space-between">
              <PlayerAvatar
                height={height}
                width={width}
                playerAvatar={avatar.avatar}
                playerPaint={avatar.paint}
                maxWidth={maxWidth}
                playerName={avatarName}
              />
              <PowerUpPill
                player={player}
                isPowerUpsRevealed={!!revealedPowerUps}
                active={active}
                setActive={setActive}
                isLastBid={isLastBid}
                powerUps={revealedPowerUps}
                isPowerUpDisabled={isPowerUpDisabled}
              />
            </SidebarPlayerWrapper>
            <PlayerName>{player.username}</PlayerName>
          </SideBarItem>
          <PlayerInformation
            isPlayerSelected={isPlayerSelected}
            totalDice={totalDice}
            playerColor={playerColor}
            extraDice={player.extraDice}
            diceSum={playerRoundData?.diceSum}
          />
        </PlayerContainer>
        {isLastBid && (
          <PlayerBid
            playerColor={playerColor}
            lastBid={lastBid}
            diceAmount={player.diceAmount}
            amountOfSidebarPlayers={amountOfSidebarPlayers}
          />
        )}
      </PlayerWrapper>
    </PlayerBox>
  );
};
