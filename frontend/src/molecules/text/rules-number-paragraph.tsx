import { FC, ReactNode } from "react";
import { BaseColumn, BodyText } from "../../atoms";
import { FontProps, fontWeights } from "../../design";

interface Props {
  heading?: string;
  gap?: string;
  headingFont?: string;
  headingFontSize?: FontProps;
  headingLineHeight?: FontProps;
  headingColor?: string;
  paragraph: ReactNode;
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {string} heading - The main heading
 * @param {string} gap - gap between components
 * @param {string} headingFont- font for the heading text heading
 * @param {FontProps} headingFontSize- font-size for the heading text heading
 * @param {string} headingLineHeight- line-height for the heading text heading
 * @param {string} headingColor - color for the heading text
 * @param {ReactNode} paragraph - This is a component used for the paragraphs.
 */

export const RulesNumberedParagraph: FC<Props> = ({
  heading,
  gap,
  headingColor,
  headingFont,
  headingFontSize,
  headingLineHeight,
  paragraph,
}) => {
  return (
    <BaseColumn gap={gap}>
      <BodyText
        customcolor={headingColor}
        font={headingFont}
        fontSize={headingFontSize}
        lineHeight={headingLineHeight}
        fontWeight={fontWeights.bolder}
        transformText="uppercase"
      >
        {heading}
      </BodyText>
      {paragraph}
    </BaseColumn>
  );
};
