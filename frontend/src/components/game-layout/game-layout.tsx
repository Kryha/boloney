import { FC } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { Hud } from "../hud";
import { Player } from "../../interfaces/player";
import { Die } from "../../interfaces/hud";

interface GameLayoutProps {
  players: Player[];
  dice: Die[];
}

// TODO: add other components
export const GameLayout: FC<GameLayoutProps> = ({ players, dice }) => {
  return (
    <>
      <GamePlayersOverview players={players} />
      <Hud dice={dice} />
    </>
  );
};
