import { FC } from "react";

import { avatarHeight } from "../atoms";
import { Player } from "../../interfaces/player";
import { GamePlayersWrapper, PlayerColor, PlayerNameContainer, PlayerAvatar, PlayerName } from "./styles";

interface GamePlayerProps {
  totalPlayers: number;
  player: Player;
}

export const GamePlayer: FC<GamePlayerProps> = ({ totalPlayers, player }) => {
  return (
    <GamePlayersWrapper>
      <PlayerAvatar src={player.avatar} alt={player.name} height={avatarHeight[totalPlayers - 1]} />
      <PlayerNameContainer>
        <PlayerColor customColor={player.color} />
        <PlayerName>{player.name}</PlayerName>
      </PlayerNameContainer>
    </GamePlayersWrapper>
  );
};
