import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { Heading2 } from "../atoms";
import { FadeTransition } from "../page-transition";

export const UseSmokeAndMirrors: FC = () => {
  return (
    <FadeTransition>
      <Heading2>{text.playerTurn.feelThePower}</Heading2>
      <Heading2 customcolor={color.darkGrey}>{text.powerUps.playingSmokeAndMirrors}</Heading2>
    </FadeTransition>
  );
};
