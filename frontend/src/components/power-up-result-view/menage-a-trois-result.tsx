import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { AvatarColor, UseMenageBackend } from "../../types";
import { Heading1, Heading2 } from "../atoms";
import { RollingDice } from "../dice-animation";

interface MenageATroisResultProps {
  data: UseMenageBackend;
  dieColor: AvatarColor;
}

export const MenageATroisResult: FC<MenageATroisResultProps> = ({ data: result, dieColor }) => {
  return (
    <>
      <Heading1>{text.powerUps.spreadShockwaves}</Heading1>
      <Heading2 customColor={color.darkGrey}>{text.powerUps.playingSmokeAndMirrors}</Heading2>
      <RollingDice dice={result.newRolledDice} dieColor={dieColor} />
    </>
  );
};
