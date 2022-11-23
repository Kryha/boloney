import { FC } from "react";

import { avatarHeight } from "../atoms";
import {
  GamePlayersWrapper,
  PlayerNameContainer,
  PlayerAvatar,
  PlayerName as Name,
  PlayerAvatarContainer,
  PlayerInfoContainer,
  GamePlayersContainer,
} from "./styles";
import { handProportion } from "../../design/hand";
import { PlayerPublic } from "../../types";
import { avatars } from "../../assets";
import { PlayerGameState } from "./game-player-info";

interface GamePlayerProps {
  totalPlayers: number;
  player: PlayerPublic;
  isWinner?: boolean;
}

export const GamePlayer: FC<GamePlayerProps> = ({ totalPlayers, player, isWinner }) => {
  const { avatar } = handProportion(avatars[player.avatarId].name);

  return (
    <GamePlayersWrapper totalPlayers={totalPlayers} isActive={player.isActive}>
      <GamePlayersContainer totalPlayers={totalPlayers}>
        <PlayerAvatarContainer>
          <PlayerAvatar src={avatar} alt={player.username} height={avatarHeight[totalPlayers - 1]} />
        </PlayerAvatarContainer>

        {isWinner || (
          <PlayerInfoContainer>
            <PlayerNameContainer>
              <Name>{player.username}</Name>
            </PlayerNameContainer>
            <PlayerGameState player={player} />
          </PlayerInfoContainer>
        )}
      </GamePlayersContainer>
    </GamePlayersWrapper>
  );
};
