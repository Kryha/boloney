import { useRef, useEffect, FC } from "react";

import { newRoll } from "./util";
import { rollDice } from "./roll-dice";
import { RollerContainer } from "./styles";
import { AvatarColor, Die } from "../../types";
import { DieType } from "./types";

interface RollingDiceProps {
  dice: Die[];
  dieColor: AvatarColor;
  dieType?: DieType;
}

export const RollingDice: FC<RollingDiceProps> = ({ dice, dieColor, dieType = DieType.D6 }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const roll = newRoll(dieType, dice, dieColor);
      rollDice(mountRef, roll);
    } catch (error) {
      console.info("Rolling effect error");
    }

    return () => {
      mountRef.current = null;
    };
  }, [dice, dieColor, dieType]);

  return <RollerContainer ref={mountRef} />;
};
