import { FC, ReactNode } from "react";
import { BaseColumn, Heading6 } from "../../atoms";
import { FontProps, TransformText } from "../../design";

interface Props {
  heading?: string;
  gap?: string;
  headingFont?: string;
  headingFontWeight?: string;
  headingFontSize?: FontProps;
  headingLineHeight?: FontProps;
  headingColor?: string;
  headingTransformation?: TransformText;
  paragraph: ReactNode;
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {string} heading - The main heading
 * @param {string} gap - gap between components
 * @param {string} headingFont- font for the heading text heading
 * @param {FontProps} headingFontWeight - font-weight for the heading text heading
 * @param {FontProps} headingFontSize- font-size for the heading text heading
 * @param {string} headingLineHeight- line-height for the heading text heading
 * @param {string} headingColor - color for the heading text
 * @param {string} headingTransformation - heading transformation, is it capitalized / uppercase etc
 * @param {ReactNode} paragraph - This is a component used for the paragraphs.
 */

export const RulesHeading: FC<Props> = ({
  heading,
  gap,
  headingColor,
  headingFont,
  headingFontSize,
  headingFontWeight,
  headingLineHeight,
  headingTransformation,
  paragraph,
}) => {
  return (
    <BaseColumn gap={gap}>
      <Heading6
        customcolor={headingColor}
        font={headingFont}
        fontSize={headingFontSize}
        lineHeight={headingLineHeight}
        fontWeight={headingFontWeight}
        transformText={headingTransformation}
      >
        {heading}
      </Heading6>
      {paragraph}
    </BaseColumn>
  );
};
