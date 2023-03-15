import { FC } from "react";
import { color } from "../../design";
import { useObserver, useViewport } from "../../hooks";
import { Heading1, Heading3, Heading6 } from "../atoms";
import { NumberedParagraphContainer, ParagraphContainer } from "./styles";

export interface ParagraphProps {
  heading: string;
  paragraph: string;
}

export const NumberedParagraph: FC<ParagraphProps> = ({ heading, paragraph }) => {
  const { ref, isVisible } = useObserver();
  const { width, height } = useViewport();

  return (
    <NumberedParagraphContainer ref={ref} isVisible={isVisible}>
      <Heading1 customColor={color.cloudWhite} />
      <ParagraphContainer width={width} height={height}>
        <Heading6>{heading}</Heading6>
        <Heading3 customColor={color.darkGrey}>{paragraph}</Heading3>
      </ParagraphContainer>
    </NumberedParagraphContainer>
  );
};
