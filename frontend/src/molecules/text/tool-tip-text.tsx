import { FC, ReactNode } from "react";
import { TooltipText } from "../../atoms";
import { FontProps, fontWeights } from "../../design";
import { GeneralWrapper, TooltipHeading } from "./styles";

interface Props {
  heading?: string;
  headingColor?: string;
  description?: ReactNode;
  descriptionColor?: string;
  gap?: string;
  descriptionFont?: string;
  descriptionFontWeight?: string;
  descriptionFontSize?: FontProps;
  descriptionLineHeight?: FontProps;
  headingFont?: string;
  headingFontWeight?: string;
  headingFontSize?: FontProps;
  headingLineHeight?: FontProps;
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {string} heading - The main heading
 * @param {string} gap - gap between components
 * @param {string} descriptionFont - font for the description / general text heading
 * @param {string} descriptionFontWeight - font-weight for the description / general text heading
 * @param {FontProps} descriptionFontSize - font-size for the description / general text heading
 * @param {FontProps} descriptionLineHeight - line-height for the description / general text heading
 * @param {string} descriptionColor - color for the description / general text
 * @param {string} headingFont- font for the heading text heading
 * @param {FontProps} headingFontWeight - font-weight for the heading text heading
 * @param {FontProps} headingFontSize- font-size for the heading text heading
 * @param {string} headingLineHeight- line-height for the heading text heading
 * @param {string} headingColor - color for the heading text
 */

export const TooltipContent: FC<Props> = ({
  heading,
  gap,
  description,
  descriptionColor,
  descriptionFont,
  descriptionFontSize,
  descriptionFontWeight,
  descriptionLineHeight,
  headingColor,
  headingFont,
  headingFontSize,
  headingFontWeight,
  headingLineHeight,
}) => {
  return (
    <GeneralWrapper>
      {heading && (
        <TooltipHeading
          customcolor={headingColor}
          font={headingFont}
          fontSize={headingFontSize}
          lineHeight={headingLineHeight}
          fontWeight={headingFontWeight || fontWeights.bolder}
          gap={gap}
        >
          {heading}
        </TooltipHeading>
      )}
      <TooltipText
        customcolor={descriptionColor}
        font={descriptionFont}
        fontSize={descriptionFontSize}
        lineHeight={descriptionLineHeight}
        fontWeight={descriptionFontWeight}
      >
        {description}
      </TooltipText>
    </GeneralWrapper>
  );
};
