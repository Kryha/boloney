import { text } from "../../assets";
import { color } from "../../design";
import { Heading1, Heading2 } from "../atoms";

export const SmokeAndMirrorsResult = () => {
  return (
    <>
      <Heading1>{text.powerUps.spreadShockwaves}</Heading1>
      <Heading2 customColor={color.darkGrey}>{text.powerUps.playingSmokeAndMirrors}</Heading2>
    </>
  );
};
