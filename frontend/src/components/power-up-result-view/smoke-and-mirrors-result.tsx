import { text } from "../../assets";
import { color } from "../../design";
import { Heading2 } from "../atoms";

export const SmokeAndMirrorsResult = () => {
  return (
    <>
      <Heading2>{text.powerUps.spreadShockwaves}</Heading2>
      <Heading2 customcolor={color.darkGrey}>{text.powerUps.playingSmokeAndMirrors}</Heading2>
    </>
  );
};
