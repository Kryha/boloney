import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { AvatarColor, UseMenageBackend } from "../../types";
import { Heading2 } from "../atoms";
import { RollingDice } from "../dice-animation";

interface SecondChanceResultProps {
  data: UseMenageBackend;
  dieColor: AvatarColor;
}

export const SecondChanceResult: FC<SecondChanceResultProps> = ({ data: result, dieColor }) => {
  return (
    <>
      <Heading2>{text.powerUps.feelThePower}</Heading2>
      <Heading2 customcolor={color.darkGrey}>{text.powerUps.playingSecondChance} </Heading2>
      <RollingDice dice={result.newRolledDice} dieColor={dieColor} />
    </>
  );
};
