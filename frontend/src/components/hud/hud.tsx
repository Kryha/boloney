import { FC } from "react";
import { Die } from "../../interfaces/hud";
import { DiceOverview } from "../dice-overview";
import { PlayerMenu } from "../player-menu";
import { PowerUpOverview } from "../power-up-overview";

interface HUDProps {
  dice?: Die[];
}

export const HUD: FC<HUDProps> = ({ dice }) => {
  return (
    <>
      <DiceOverview dice={dice} />
      <PowerUpOverview />
      <PlayerMenu />
    </>
  );
};
