import { FC } from "react";

import { DiceOverview } from "../dice-overview";
import { PowerUpOverview } from "../power-up-overview";

interface HudProps {}

export const Hud: FC<HudProps> = ({}) => {
  return (
    <>
      <DiceOverview />
      <PowerUpOverview />
    </>
  );
};
