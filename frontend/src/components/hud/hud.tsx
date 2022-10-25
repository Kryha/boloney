import { FC } from "react";

import { Die, PowerUp } from "../../types";
import { DiceOverview } from "../dice-overview";
import { PlayerMenu } from "../player-menu";
import { PowerUpOverview } from "../power-up-overview";
import { PlayerOverview } from "./styles";

interface HUDProps {
  dice?: Die[];
  powerUp?: PowerUp[];
}

export const HUD: FC<HUDProps> = ({ dice, powerUp }) => {
  return (
    <>
      <PlayerOverview>
        <DiceOverview dice={dice} />
        <PowerUpOverview powerUps={powerUp} />
      </PlayerOverview>
      <PlayerMenu />
    </>
  );
};
