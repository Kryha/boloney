import { useState } from "react";
// import { Die } from "../../interfaces";
import { DiceContainer } from "./styles";
import { YourDice } from "./your-dice";

export const ThrowDice = () => {
  const [hasRolled, setHasRolled] = useState(false);
  const [rollComplete, setRollComplete] = useState(false);
  // const [diceValues, setDiceValues] = useState<Die[] | undefined>();

  // const getRolledValues = (rolls: any): Die[] => {
  //   const values: Die[] = [];

  //   rolls.map((roll: any, index: number) => {
  //     const tempValue = roll.value;
  //     values[index] = { rolledValue: tempValue };
  //   });

  //   return values;
  // };

  // if (rollComplete) return <YourDice diceValues={diceValues} />;

  return <DiceContainer></DiceContainer>;
};
