import { FC } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { Hud } from "../hud";
import { Player } from "../../interfaces/player";
import { Die } from "../../interfaces/hud";
import { PlayerMenu } from "../player-menu";
import { Controls } from "../controls";

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
      <Controls />
    </>
  );
};
