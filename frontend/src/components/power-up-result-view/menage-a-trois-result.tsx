import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { AvatarColor, UseMenageBackend } from "../../types";
import { Heading2 } from "../atoms";
import { RollingDice } from "../dice-animation";

interface MenageATroisResultProps {
  data: UseMenageBackend;
  dieColor: AvatarColor;
}

export const MenageATroisResult: FC<MenageATroisResultProps> = ({ data: result, dieColor }) => {
  return (
    <>
      <Heading2>{text.playerTurn.feelThePower}</Heading2>
      <Heading2 customColor={color.darkGrey}>{text.powerUps.playMenageATrois}</Heading2>
      <RollingDice dice={result.newRolledDice} dieColor={dieColor} />
    </>
  );
};
