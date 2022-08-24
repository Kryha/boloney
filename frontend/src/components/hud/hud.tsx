import { FC } from "react";
import { Dice } from "../../interfaces/hud";
import { DiceOverview } from "../dice-overview";

interface HudProps {
  dice: Dice[];
}

// TODO: add power up view
export const Hud: FC<HudProps> = ({ dice }) => {
  return <DiceOverview dice={dice} />;
};
