import { FC } from "react";

import { GamePlayersHandWrapper, GamePlayersOverviewWrapper } from "./styles";
import { GamePlayer } from "../game-player";
import { Player } from "../../interfaces/player";
import { Hand } from "../hand";

interface GamePlayerOverviewProps {
  players: Player[];
}

export const GamePlayersOverview: FC<GamePlayerOverviewProps> = ({ players }) => {
  return (
    <>
      {players.length === 1 ? (
        <GamePlayersHandWrapper>
          <Hand avatarName={players[0].avatarName} />
        </GamePlayersHandWrapper>
      ) : (
        <GamePlayersOverviewWrapper>
          {players.map((player) => (
            <GamePlayer key={player.id} player={player} totalPlayers={players.length} />
          ))}
        </GamePlayersOverviewWrapper>
      )}
    </>
  );
};
