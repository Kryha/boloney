import { FC } from "react";

import { avatarHeight, Heading6 } from "../atoms";
import {
  GamePlayersWrapper,
  PlayerNameContainer,
  PlayerAvatar,
  PlayerName as Name,
  PlayerAvatarContainer,
  PlayerInfoContainer,
  GamePlayersContainer,
  DiceContainer,
} from "./styles";
import { handProportion } from "../../design/hand";
import { PlayerPublic } from "../../types";
import { avatars, text } from "../../assets";
import { PlayerGameState } from "./game-player-info";
import { LoserBadge, WinnerBadge } from "../badges/badges";
import { Die } from "../die";

interface GamePlayerProps {
  totalPlayers: number;
  player: PlayerPublic;
}

export const GamePlayer: FC<GamePlayerProps> = ({ totalPlayers, player }) => {
  const { avatar } = handProportion(avatars[player.avatarId].name);
  // TODO: remove fake value
  const isWinner = false;
  const isLoser = false;
  return (
    <GamePlayersWrapper totalPlayers={totalPlayers} isActive={player.isActive}>
      {isWinner && <WinnerBadge />}
      {isLoser && <LoserBadge />}
      <GamePlayersContainer totalPlayers={totalPlayers}>
        <PlayerAvatarContainer>
          <PlayerAvatar src={avatar} alt={player.username} height={avatarHeight[totalPlayers - 1]} />
        </PlayerAvatarContainer>

        <PlayerInfoContainer>
          <PlayerNameContainer>
            <Name>{player.username}</Name>
          </PlayerNameContainer>
          <PlayerGameState player={player} />
        </PlayerInfoContainer>
      </GamePlayersContainer>
      {/* TODO: remove fake values */}
      {isWinner && (
        <DiceContainer>
          <Heading6>{text.param.xAmount(6)}</Heading6>
          <Die value={6} />
        </DiceContainer>
      )}
    </GamePlayersWrapper>
  );
};
