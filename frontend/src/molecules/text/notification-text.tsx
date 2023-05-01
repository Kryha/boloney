import { FC } from "react";
import { BodyText, Heading6 } from "../../atoms";
import { FontProps, TransformText } from "../../design";
import { NotificationHeadingWrapper } from "./styles";

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
 */

export const NotificationHeading: FC<Props> = ({
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
}) => {
  return (
    <NotificationHeadingWrapper gap={gap}>
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
      <BodyText
        customcolor={subheadingColor}
        font={subheadingFont}
        fontSize={subheadingFontSize}
        lineHeight={subheadingLineHeight}
        fontWeight={subheadingFontWeight}
        transformText={subheadingTransformation}
      >
        {subheading}
      </BodyText>
    </NotificationHeadingWrapper>
  );
};
