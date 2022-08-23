import { FC } from "react";

import { color } from "../../design";
import { GamePlayersOverviewWrapper } from "./styles";
import { GamePlayer } from "../game-player";
import { LobsterHand } from "../../assets/images";
import { Player } from "../../interfaces";

interface GamePlayerOverviewProps {
  players: Player[];
}

export const GamePlayersOverview: FC<GamePlayerOverviewProps> = ({ players }) => {
  return (
    <GamePlayersOverviewWrapper>
      {players.map((player, key) => (
        <GamePlayer key={key} player={player} totalPlayers={players.length} />
      ))}
    </GamePlayersOverviewWrapper>
  );
};
