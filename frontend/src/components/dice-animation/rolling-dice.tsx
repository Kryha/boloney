import { useRef, useState, useEffect, FC } from "react";
import { DiceRoll, newRoll } from "./index";
import { text } from "../../assets";
import { PrimaryButton } from "../buttons";
import { rollDice } from "./roll-dice";
import { RollerContainer } from "./styles";
import { Die as Dice, MatchOpCode } from "../../types";
import { DieType } from "./types";
import { useMatch } from "../../service/match";
import { useStore } from "../../store";
import { useTimeout } from "usehooks-ts";

interface RollingDiceProps {
  dice?: Dice[];
  dieColor: string;
}
export const RollingDice: FC<RollingDiceProps> = ({ dice, dieColor }) => {
  const { broadcastPlayerReady, sendMatchState } = useMatch();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [roll, setRoll] = useState<DiceRoll | undefined>();
  const hasRolledDice = useStore((state) => state.hasRolledDice);
  const setIsDiceStable = useStore((state) => state.setIsDiceStable);
  const setIsDiceThrown = useStore((state) => state.setIsDiceThrown);
  const isDiceThrown = useStore((state) => state.isDiceThrown);

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
    const stableListener = () => setIsDiceThrown(true);
    window.addEventListener("diceStable", stableListener);
    return () => {
      window.removeEventListener("diceStable", stableListener);
    };
  }, [setIsDiceThrown]);

  const onRoll = () => {
    setIsDiceThrown(false);
    const diceRoll = newRoll(DieType.D6, dice || [], dieColor);
    setRoll(diceRoll);
    setIsDiceThrown(true);
  };

  const onReady = () => {
    sendMatchState(MatchOpCode.ROLL_DICE);
  };

  if (isDiceThrown) {
    console.log("yo, im her");
    setTimeout(function () {
      broadcastPlayerReady();
    }, 3000);
  }
  return (
    <RollerContainer ref={mountRef}>
      {!hasRolledDice ? (
        <PrimaryButton text={text.match.imReady} onClick={() => onReady()} />
      ) : (
        <PrimaryButton text={text.general.rollIt} onClick={() => onRoll()} />
      )}
    </RollerContainer>
  );
};
