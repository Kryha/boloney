import { FC } from "react";
import Highlighter from "react-highlight-words";
import { Heading1, Heading2 } from "../atoms";
import { color } from "../../design";
import { AnimatedWaitingText } from "../waiting-text";

interface Props {
  headingOne: string;
  headingTwo: string;
  wordsToBold?: string[] | RegExp[];
  isAnimated?: boolean;
}

export const MatchHeading: FC<Props> = ({ headingOne, headingTwo, wordsToBold = [], isAnimated = true }) => {
  return (
    <>
      <Heading1>{headingOne}</Heading1>
      {isAnimated ? (
        <AnimatedWaitingText headingTwo={headingTwo} wordsToBold={wordsToBold} />
      ) : (
        <Heading2 customColor={color.darkGrey}>
          <Highlighter highlightClassName="bold" searchWords={wordsToBold} autoEscape textToHighlight={headingTwo} />
        </Heading2>
      )}
    </>
  );
};
