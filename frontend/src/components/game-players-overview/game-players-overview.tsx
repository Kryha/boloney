import { FC } from "react";

import { GamePlayersOverviewWrapper } from "./styles";
import { GamePlayer } from "../game-player";
import { Player } from "../../interfaces/player";

interface GamePlayerOverviewProps {
  players: Player[];
}

export const GamePlayersOverview: FC<GamePlayerOverviewProps> = ({ players }) => {
  return (
    <GamePlayersOverviewWrapper>
      {players.map((player) => (
        <GamePlayer key={player.id} player={player} totalPlayers={players.length} />
      ))}
    </GamePlayersOverviewWrapper>
  );
};
