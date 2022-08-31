import { FC } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { HUD } from "../hud";
import { Player } from "../../interfaces/player";
import { Die } from "../../interfaces/hud";

interface GameLayoutProps {
  players: Player[];
  dice: Die[];
}

export const GameLayout: FC<GameLayoutProps> = ({ players, dice }) => {
  return (
    <>
      <GamePlayersOverview players={players} />
      <HUD dice={dice} />
    </>
  );
};
