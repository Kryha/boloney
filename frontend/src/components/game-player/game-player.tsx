import { FC } from "react";

import { avatarHeight } from "../atoms";
import {
  GamePlayersWrapper,
  PlayerColor,
  PlayerNameContainer,
  PlayerAvatar,
  PlayerName as Name,
  GameStateContainer,
  PlayerAvatarContainer,
  PlayerInfoContainer,
  GamePlayersContainer,
} from "./styles";
import { handProportion } from "../../design/hand";
import { Player } from "../../types";
import { Die } from "../die";
import { DiceIcon, PowerUpIcon } from "../icons";

interface GamePlayerProps {
  totalPlayers: number;
  player: Player;
}
interface PlayerNameProps {
  name: string;
  color: string;
}

export const PlayerName: FC<PlayerNameProps> = ({ name, color }) => {
  return (
    <PlayerNameContainer>
      <PlayerColor customColor={color} />
      <Name>{name}</Name>
    </PlayerNameContainer>
  );
};

interface PlayerGameStateProps {
  player: Player;
}

export const PlayerGameState: FC<PlayerGameStateProps> = ({ player }) => {
  return (
    <GameStateContainer>
      <DiceIcon diceAmount={0} />
      <PowerUpIcon powerUpAmount={1} />
    </GameStateContainer>
  );
};

export const GamePlayer: FC<GamePlayerProps> = ({ totalPlayers, player }) => {
  const { avatar } = handProportion(player.avatarName);
  return (
    <GamePlayersWrapper playersAmount={totalPlayers}>
      <GamePlayersContainer playersAmount={totalPlayers} height={""}>
        <PlayerAvatarContainer height={avatarHeight[totalPlayers - 1]} playersAmount={totalPlayers}>
          <PlayerAvatar src={avatar} alt={player.username} height={avatarHeight[totalPlayers - 1]} playersAmount={totalPlayers} />
        </PlayerAvatarContainer>
        <PlayerInfoContainer>
          <PlayerNameContainer>
            <Name>{player.username}</Name>
          </PlayerNameContainer>
          <PlayerGameState player={player} />
        </PlayerInfoContainer>
      </GamePlayersContainer>
    </GamePlayersWrapper>
  );
};
