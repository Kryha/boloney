import { FC } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { Hud } from "../hud";
import { PlayerMenu } from "../player-menu";
import { Player } from "../../interfaces/player";

interface GameLayoutProps {
  players: Player[];
}

// TODO: add other components
export const GameLayout: FC<GameLayoutProps> = ({ players }) => {
  return (
    <>
      <GamePlayersOverview players={players} />
      <Hud />
      <PlayerMenu />
    </>
  );
};
