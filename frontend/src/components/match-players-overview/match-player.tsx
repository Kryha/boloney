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
import { PlayerMatchState, PlayerLastBid } from "./match-player-info";
import { useLatestBid } from "../../service";
import { PlayerBadge } from "../badges";

interface MatchPlayerProps {
  totalPlayers: number;
  player: PlayerPublic;
}

export const MatchPlayer: FC<MatchPlayerProps> = ({ totalPlayers, player }) => {
  const hasPlayerLost = player.diceAmount === 0;
  const { avatar } = hasPlayerLost ? handProportion("grave") : handProportion(avatars[player.avatarId].name);
  const latestBid = useLatestBid();

  return (
    <MatchPlayersWrapper isActive={player.isActive} hasPlayerLost={hasPlayerLost}>
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
      {latestBid?.userId === player.userId && <PlayerLastBid player={player} lastBid={latestBid} />}
    </MatchPlayersWrapper>
  );
};
