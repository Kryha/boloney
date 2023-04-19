import { FC } from "react";
import { BaseRow, InfoDisplay } from "../../atoms";
import { FontProps, TransformText } from "../../design";

interface Props {
  heading?: string;
  headingFont?: string;
  headingFontWeight?: string;
  headingFontSize?: FontProps;
  headingLineHeight?: FontProps;
  headingColor?: string;
  headingTransformation?: TransformText;
  justifyContent?: string;
}

/**
 * @param {string} heading - The main heading
 * @param {string} headingFont- font for the heading text heading
 * @param {FontProps} headingFontWeight - font-weight for the heading text heading
 * @param {FontProps} headingFontSize- font-size for the heading text heading
 * @param {string} headingLineHeight- line-height for the heading text heading
 * @param {string} headingColor - color for the heading text
 * @param {string} headingTransformation - heading transformation, is it capitalized / uppercase etc
 * @param {string} justifyContent - heading position i.e left or right
 */

export const LargeInfoHeading: FC<Props> = ({
  heading,
  headingColor,
  headingFont,
  headingFontSize,
  headingFontWeight,
  headingLineHeight,
  headingTransformation,
  justifyContent,
}) => {
  return (
    <BaseRow justifyContent={justifyContent}>
      <InfoDisplay
        customcolor={headingColor}
        font={headingFont}
        fontSize={headingFontSize}
        lineHeight={headingLineHeight}
        fontWeight={headingFontWeight}
        transformText={headingTransformation}
      >
        {heading}
      </InfoDisplay>
    </BaseRow>
  );
};
