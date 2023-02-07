import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { Heading2 } from "../atoms";

export const UseSmokeAndMirrors: FC = () => {
  return (
    <>
      <Heading2>{text.playerTurn.feelThePower}</Heading2>
      <Heading2 customColor={color.darkGrey}>{text.powerUps.playingSmokeAndMirrors}</Heading2>
    </>
  );
};
