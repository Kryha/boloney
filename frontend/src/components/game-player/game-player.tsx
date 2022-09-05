import { FC } from "react";

import { avatarHeight } from "../atoms";
import { Player } from "../../interfaces/player";
import { GamePlayersWrapper, PlayerColor, PlayerNameContainer, PlayerAvatar, PlayerName as Name } from "./styles";

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

export const GamePlayer: FC<GamePlayerProps> = ({ totalPlayers, player }) => {
  return (
    <GamePlayersWrapper>
      <PlayerAvatar src={player.avatar} alt={player.name} height={avatarHeight[totalPlayers - 1]} />
      <PlayerName name={player.name} color={player.color} />
    </GamePlayersWrapper>
  );
};
