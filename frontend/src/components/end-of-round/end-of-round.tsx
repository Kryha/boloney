import { text } from "../../assets";
import { Heading1 } from "../atoms";
import { PrimaryButton } from "../buttons";

// TODO: finish component
export const EndOfGame = () => {
  return (
    <>
      <Heading1>{text.match.endOfGame}</Heading1>
      <PrimaryButton text={text.match.newGame} />
    </>
  );
};
