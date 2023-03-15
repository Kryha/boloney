import { useRef, useEffect, FC } from "react";

import { newRoll } from "./util";
import { rollDice } from "./roll-dice";
import { RollerContainer } from "./styles";
import { AvatarColor, Die } from "../../types";
import { DieType } from "./types";
import { usePlaySound } from "../../hooks";
import { diceRollSound } from "../../assets";

interface RollingDiceProps {
  dice: Die[];
  dieColor: AvatarColor;
  dieType?: DieType;
}

export const RollingDice: FC<RollingDiceProps> = ({ dice, dieColor, dieType = DieType.D6 }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const playSound = usePlaySound();

  useEffect(() => {
    try {
      const roll = newRoll(dieType, dice, dieColor);
      rollDice(mountRef, roll);
      playSound(diceRollSound);
    } catch (error) {
      console.info("Rolling effect error");
    }

    return () => {
      mountRef.current = null;
    };
  }, [dice, dieColor, dieType, playSound]);

  return <RollerContainer ref={mountRef} />;
};
