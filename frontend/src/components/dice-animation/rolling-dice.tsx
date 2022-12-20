import { useRef, useState, useEffect, FC } from "react";

import { DiceRoll, newRoll } from "./index";
import { rollDice } from "./roll-dice";
import { RollerContainer } from "./styles";
import { Die } from "../../types";
import { DieType } from "./types";
import { useStore } from "../../store";

interface RollingDiceProps {
  dice: Die[];
  dieColor: string;
  dieType?: DieType;
}

// TODO: fix rendering on built version
// TODO: fix the scenario when multiple re-joins make this component throw and the user gets out of the match view
export const RollingDice: FC<RollingDiceProps> = ({ dice, dieColor, dieType = DieType.D6 }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [roll, setRoll] = useState<DiceRoll | undefined>();

  const setIsDiceStable = useStore((state) => state.setIsDiceStable);
  const setIsDiceThrown = useStore((state) => state.setIsDiceThrown);

  useEffect(() => {
    let element: HTMLCanvasElement | null = null;
    const mountRefs = mountRef?.current;
    if (roll != null && mountRef.current != null) {
      element = rollDice(mountRef, roll);
    }
    return () => {
      try {
        if (element && mountRefs) mountRefs.removeChild(element);
      } catch (error) {
        console.warn("ref not found or mount");
      }
    };
  }, [mountRef, roll]);

  useEffect(() => {
    const stableListener = () => setIsDiceStable(true);
    window.addEventListener("diceStable", stableListener);
    return () => {
      window.removeEventListener("diceStable", stableListener);
    };
  }, [setIsDiceStable]);

  useEffect(() => {
    setIsDiceStable(false);
    const diceRoll = newRoll(dieType, dice, dieColor);
    setIsDiceThrown(true);
    setRoll(diceRoll);
  }, [dice, dieColor, dieType, setIsDiceStable, setIsDiceThrown]);

  return <RollerContainer ref={mountRef} />;
};
