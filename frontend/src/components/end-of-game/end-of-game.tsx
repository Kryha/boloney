import { text } from "../../assets";
import { Heading1 } from "../atoms";
import { PrimaryButton } from "../buttons";

// TODO: finish component
export const EndOfRound = () => {
  return (
    <>
      <Heading1>{text.match.getPowerUps}</Heading1>
      <PrimaryButton text={text.match.goForIt} />
    </>
  );
};
