import { FC } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { Hud } from "../hud";
import { Player } from "../../interfaces/player";
import { Die } from "../../interfaces";
import { PlayerMenu } from "../player-menu";

interface GameLayoutProps {
  players: Player[];
  dice: Die[];
}

export const GameLayout: FC<GameLayoutProps> = ({ players, dice }) => {
  return (
    <>
      <GamePlayersOverview players={players} />
      <Hud dice={dice} />
      <PlayerMenu />
    </>
  );
};
