import { FC } from "react";

import { avatarHeight } from "../atoms";
import { GamePlayersWrapper, PlayerColor, PlayerNameContainer, PlayerAvatar, PlayerName as Name } from "./styles";
import { handProportion } from "../../design/hand";
import { Player } from "../../types";

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
  const { avatar } = handProportion(player.avatarName);
  return (
    <GamePlayersWrapper>
      <PlayerAvatar src={avatar} alt={player.username} height={avatarHeight[totalPlayers - 1]} />
      <PlayerName name={player.username} color={player.color} />
    </GamePlayersWrapper>
  );
};
