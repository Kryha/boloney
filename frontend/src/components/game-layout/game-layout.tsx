import { FC } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { Hud } from "../hud";
import { PlayerMenu } from "../player-menu";
import { Player } from "../../interfaces/player";
import { Dice } from "../../interfaces";

interface GameLayoutProps {
  players: Player[];
  dice: Dice[];
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
