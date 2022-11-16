import { useEffect, useRef, useState } from "react";
import { DiceRoll, DiceRollSchema, DieType, newRoll } from ".";
import { rollDice } from "./diceRoll";

export const a = {
  type: DieType.D6,
  amount: 5,
  result: [
    { type: DieType.D6, roll: 1 },
    { type: DieType.D6, roll: 1 },
    { type: DieType.D6, roll: 1 },
    { type: DieType.D6, roll: 1 },
    { type: DieType.D6, roll: 1 },
  ],
  campaignId: 1,
};

const Roll = () => {
  const [stable, setStable] = useState(true);
  const [roll, setRoll] = useState<DiceRoll | undefined>(a);

  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let element: HTMLCanvasElement | null = null;
    const mountRefs = mountRef?.current;
    if (roll != null && mountRef.current != null) {
      element = rollDice(mountRef, roll);
    }
    return () => (element && mountRefs ? mountRefs.removeChild(element) && undefined : undefined);
  }, [mountRef, roll]);

  useEffect(() => {
    const stableListener = () => setStable(true);
    window.addEventListener("diceStable", stableListener);
    return () => {
      window.removeEventListener("diceStable", stableListener);
    };
  }, [setStable]);
};

export default Roll;
