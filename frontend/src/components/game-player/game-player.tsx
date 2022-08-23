import { FC } from "react";

import { Heading4, avatarHeight } from "../atoms";
import { Player } from "../../interfaces/player";
import { GamePlayersWrapper, PlayerColor, PlayerNameContainer, PlayerAvator } from "./styles";

interface GamePlayerProps {
  totalPlayers: number;
  player: Player;
}

export const GamePlayer: FC<GamePlayerProps> = ({ totalPlayers, player }) => {
  return (
    <GamePlayersWrapper>
      <PlayerAvator src={player.avatar} alt={player.name} height={avatarHeight[totalPlayers]} />
      <PlayerNameContainer>
        <PlayerColor customColor={player.color} />
        <Heading4>{player.name}</Heading4>
      </PlayerNameContainer>
    </GamePlayersWrapper>
  );
};
