import { FC } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { DiceOverview } from "../dice-overview";
import { PowerUpOverview } from "../power-up-overview";
import { PlayerMenu } from "../player-menu";
import { color } from "../../design";
import { Player } from "../../interfaces";

interface GameLayoutProps {
  players: Player[];
}

// TODO: add other components
export const GameLayout: FC<GameLayoutProps> = ({ players }) => {
  return (
    <>
      <GamePlayersOverview players={players} />
      <DiceOverview />
      <PowerUpOverview />
      <PlayerMenu />
    </>
  );
};
