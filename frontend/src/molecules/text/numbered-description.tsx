import { FC } from "react";
import { AlignContent, Heading1, Heading3, Heading6 } from "../../atoms";
import { FontProps, TransformText } from "../../design";
import { NumberedColumn, NumberedParagraph } from "./styles";

interface Props {
  numberFont?: string;
  numberFontWeight?: string;
  numberFontSize?: FontProps;
  numberLineHeight?: FontProps;
  numberColor?: string;
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
  justifyContent?: AlignContent;
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
 * @param {string} headingFont- font for the heading text
 * @param {FontProps} headingFontWeight - font-weight for the heading text
 * @param {FontProps} headingFontSize- font-size for the heading text
 * @param {string} headingLineHeight- line-height for the heading text
 * @param {string} headingColor - color for the heading text
 * @param {string} headingTransformation - heading transformation, is it capitalized / uppercase etc
 * @param {string} subheadingTransformation - subheading transformation, is it capitalized / uppercase etc
 * @param {string} numberFont- font for the number  heading
 * @param {FontProps} numberFontWeight - font-weight for the number heading
 * @param {FontProps} numberFontSize- font-size for the number heading
 * @param {string} numberLineHeight- line-height for the number heading
 * @param {string} numberColor - color for the number text
 * @param {AlignContent} justifyContent - for reversed icons i.e icons to the left the value must be flex-end
 */

export const NumberedDescriptionText: FC<Props> = ({
  subheading,
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
  numberColor,
  numberFont,
  numberFontSize,
  numberFontWeight,
  numberLineHeight,
  justifyContent,
}) => {
  return (
    <NumberedColumn gap={gap} justifyContent={justifyContent}>
      <Heading1
        customcolor={numberColor}
        font={numberFont}
        fontSize={numberFontSize}
        lineHeight={numberLineHeight}
        fontWeight={numberFontWeight}
      />
      <NumberedParagraph>
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
        <Heading3
          customcolor={subheadingColor}
          font={subheadingFont}
          fontSize={subheadingFontSize}
          lineHeight={subheadingLineHeight}
          fontWeight={subheadingFontWeight}
          transformText={subheadingTransformation}
        >
          {subheading}
        </Heading3>
      </NumberedParagraph>
    </NumberedColumn>
  );
};
