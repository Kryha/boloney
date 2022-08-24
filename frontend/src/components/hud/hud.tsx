import { FC } from "react";
import { Die } from "../../interfaces/hud";
import { DiceOverview } from "../dice-overview";

interface HudProps {
  dice: Die[];
}

// TODO: add power up view
export const Hud: FC<HudProps> = ({ dice }) => {
  return <DiceOverview dice={dice} />;
};
