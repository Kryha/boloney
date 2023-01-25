import { FC } from "react";

import { avatarHeight } from "../atoms";
import {
  MatchPlayersWrapper,
  PlayerNameContainer,
  PlayerAvatar,
  PlayerName as Name,
  PlayerAvatarContainer,
  PlayerInfoContainer,
  MatchPlayersContainer,
  DeadPlayerAvatar,
  DeadPlayerName,
} from "./styles";
import { handProportion } from "../../design/hand";
import { PlayerPublic } from "../../types";
import { avatars } from "../../assets";
import { PlayerMatchState } from "./match-player-info";
import { useLatestBid } from "../../service";
import { PlayerBadge } from "../badges";
import { PlayerSidebarInfo } from "../player-sidebar-info";
import { useStore } from "../../store";
import { powerUpRequiresTarget } from "../../util";

interface MatchPlayerProps {
  totalPlayers: number;
  player: PlayerPublic;
}

export const MatchPlayer: FC<MatchPlayerProps> = ({ totalPlayers, player }) => {
  const latestBid = useLatestBid();
  const targetPowerUpPlayerId = useStore((state) => state.powerUpState.targetPlayerId);
  const activePowerUp = useStore((state) => state.powerUpState.active);

  const hasPlayerLost = player.diceAmount === 0;
  const { avatar } = hasPlayerLost ? handProportion("grave") : handProportion(avatars[player.avatarId].name);

  const showSelectionView = () => {
    if (player.status === "lost" || !activePowerUp) return false;
    return powerUpRequiresTarget(activePowerUp.id);
  };

  return (
    <MatchPlayersWrapper
      isActive={player.isActive}
      hasPlayerLost={hasPlayerLost}
      isTargetPlayer={targetPowerUpPlayerId === player.userId}
      isPowerUpInUse={showSelectionView()}
    >
      <PlayerBadge player={player} />

      <MatchPlayersContainer totalPlayers={totalPlayers}>
        {hasPlayerLost ? (
          <PlayerAvatarContainer>
            <DeadPlayerAvatar src={avatar} alt={player.username} height={avatarHeight[totalPlayers - 1]} />
            <DeadPlayerName>{player.username}</DeadPlayerName>
          </PlayerAvatarContainer>
        ) : (
          <>
            <PlayerAvatarContainer>
              <PlayerAvatar src={avatar} alt={player.username} height={avatarHeight[totalPlayers - 1]} />
            </PlayerAvatarContainer>
            <PlayerInfoContainer>
              <PlayerNameContainer>
                <Name>{player.username}</Name>
              </PlayerNameContainer>
              <PlayerMatchState player={player} />
            </PlayerInfoContainer>
          </>
        )}
      </MatchPlayersContainer>
      <PlayerSidebarInfo
        player={player}
        lastBid={latestBid}
        showLastBid={latestBid?.userId === player.userId}
        totalPlayers={totalPlayers}
        targetPlayerId={targetPowerUpPlayerId}
        isPowerUpInUse={showSelectionView()}
      />
    </MatchPlayersWrapper>
  );
};
