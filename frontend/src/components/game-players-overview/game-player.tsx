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
import { Die } from "../die";
import { useLatestBid } from "../../service";
import { PlayerBadge } from "../badges";

interface GamePlayerProps {
  totalPlayers: number;
  player: PlayerPublic;
}

export const GamePlayer: FC<GamePlayerProps> = ({ totalPlayers, player }) => {
  const { avatar } = handProportion(avatars[player.avatarId].name);
  const latestBid = useLatestBid();

  return (
    <GamePlayersWrapper totalPlayers={totalPlayers} isActive={player.isActive}>
      <PlayerBadge player={player} />

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

      {latestBid?.userId === player.userId && (
        <DiceContainer>
          <Heading6>{text.param.xAmount(latestBid.amount)}</Heading6>
          <Die value={latestBid.face} />
        </DiceContainer>
      )}
    </GamePlayersWrapper>
  );
};
