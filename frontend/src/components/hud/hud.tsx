import { FC } from "react";
import { Dice } from "../../interfaces/hud";
import { DiceOverview } from "../dice-overview";
import { PowerUpOverview } from "../power-up-overview";

interface HudProps {
  dice: Dice[];
}

export const Hud: FC<HudProps> = ({ dice }) => {
  return (
    <>
      <DiceOverview dice={dice} />
      <PowerUpOverview />
    </>
  );
};
