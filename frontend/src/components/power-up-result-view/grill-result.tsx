import { FC } from "react";

import { text } from "../../assets";
import { color } from "../../design";
import { Heading2 } from "../../atoms";

interface Props {
  isCorrect: boolean;
}

export const GrillResult: FC<Props> = ({ isCorrect }) => {
  const heading1 = isCorrect ? text.general.youAreRight : text.general.youAreWrong;
  const heading2 = isCorrect ? text.general.youRockAtThis : text.general.badLuckWithYourMove;

  return (
    <>
      <Heading2>{heading1}</Heading2>
      <Heading2 customcolor={color.darkGrey}>{heading2}</Heading2>
    </>
  );
};
