import { FC } from "react";
import { Player } from "@zk-liars-dice/types";

import { avatarHeight } from "../atoms";
import { GamePlayersWrapper, PlayerColor, PlayerNameContainer, PlayerAvatar, PlayerName as Name } from "./styles";
import { handProportion } from "../../design/hand";

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
      <PlayerAvatar src={avatar} alt={player.name} height={avatarHeight[totalPlayers - 1]} />
      <PlayerName name={player.name} color={player.color} />
    </GamePlayersWrapper>
  );
};
