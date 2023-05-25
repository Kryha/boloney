import { FC } from "react";
import Highlighter from "react-highlight-words";
import { BaseColumn, Heading2 } from "../../atoms";
import { FontProps, TransformText } from "../../design";

interface Props {
  subheading?: string;
  heading?: string;
  gap?: string;
  subheadingFont?: string;
  subheadingFontWeight?: string;
  subheadingFontSize?: FontProps;
  subheadingLineHeight?: FontProps;
  subheadingColor?: string;
  headingFont?: string;
  headingFontWeight?: string;
  headingFontSize?: FontProps;
  headingLineHeight?: FontProps;
  headingColor?: string;
  headingTransformation?: TransformText;
  subheadingTransformation?: TransformText;
  wordsToBold?: string[] | RegExp[];
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {string} subheading - subheading / general text
 * @param {string} heading - The main heading
 * @param {string} gap - gap between components
 * @param {string} subheadingFont - font for the subheading / general text heading
 * @param {string} subheadingFontWeight - font-weight for the subheading / general text heading
 * @param {FontProps} subheadingFontSize - font-size for the subheading / general text heading
 * @param {FontProps} subheadingLineHeight - line-height for the subheading / general text heading
 * @param {string} subheadingColor - color for the subheading / general text
 * @param {string} headingFont- font for the heading text heading
 * @param {FontProps} headingFontWeight - font-weight for the heading text heading
 * @param {FontProps} headingFontSize- font-size for the heading text heading
 * @param {string} headingLineHeight- line-height for the heading text heading
 * @param {string} headingColor - color for the heading text
 * @param {string} headingTransformation - heading transformation, is it capitalized / uppercase etc
 * @param {string} subheadingTransformation - subheading transformation, is it capitalized / uppercase etc
 * @param {string[] | RegExp[]} wordsToBold - an array of words that need to be bold within the subheading
 */

export const ColumnHeading: FC<Props> = ({
  subheading = "",
  heading,
  gap,
  subheadingColor,
  subheadingFont,
  subheadingFontSize,
  subheadingFontWeight,
  subheadingLineHeight,
  headingColor,
  headingFont,
  headingFontSize,
  headingFontWeight,
  headingLineHeight,
  headingTransformation,
  subheadingTransformation,
  wordsToBold = [],
}) => {
  return (
    <BaseColumn gap={gap}>
      <Heading2
        customcolor={headingColor}
        font={headingFont}
        fontSize={headingFontSize}
        lineHeight={headingLineHeight}
        fontWeight={headingFontWeight}
        transformText={headingTransformation}
      >
        {heading}
      </Heading2>
      <Heading2
        customcolor={subheadingColor}
        font={subheadingFont}
        fontSize={subheadingFontSize}
        lineHeight={subheadingLineHeight}
        fontWeight={subheadingFontWeight}
        transformText={subheadingTransformation}
      >
        <Highlighter highlightClassName="bold" searchWords={wordsToBold} autoEscape textToHighlight={subheading} />
      </Heading2>
    </BaseColumn>
  );
};
