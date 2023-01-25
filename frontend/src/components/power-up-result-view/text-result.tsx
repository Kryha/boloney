import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { Heading1, Heading2 } from "../atoms";

interface TextResultProps {
  isWinner?: boolean;
}

export const TextResult: FC<TextResultProps> = ({ isWinner }) => {
  const heading1 = isWinner ? text.general.youAreRight : text.general.youAreWrong;
  const heading2 = isWinner ? text.general.youRockAtThis : text.general.badLuckWithYourMove;

  return (
    <>
      <Heading1>{heading1}</Heading1>
      <Heading2 customColor={color.darkGrey}>{heading2}</Heading2>
    </>
  );
};
