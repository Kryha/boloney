import { Die } from "@zk-liars-dice/types";
import { FC } from "react";
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
