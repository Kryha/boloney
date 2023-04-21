import { FC, ReactNode } from "react";
import { AlignContent, Heading6, IconPosition } from "../../atoms";
import { FontProps, fontWeights } from "../../design";
import { FlexibleRow } from "./styles";

interface Props {
  heading?: string;
  headingColor?: string;
  headingFont?: string;
  headingFontWeight?: string;
  headingFontSize?: FontProps;
  headingLineHeight?: FontProps;
  gap?: string;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  justifyContent?: AlignContent;
}

/**
 * @param {string} heading - The main heading
 * @param {string} gap - gap between components
 * @param {string} headingFont- font for the heading text heading
 * @param {FontProps} headingFontWeight - font-weight for the heading text heading
 * @param {FontProps} headingFontSize- font-size for the heading text heading
 * @param {string} headingLineHeight- line-height for the heading text heading
 * @param {string} headingColor - color for the heading text
 * @param {ReactNode} icon - icon for the tool tip heading
 * @param {IconPosition} iconPosition - position for the icon, i.e left or right
 * @param {AlignContent} justifyContent - for reversed icons i.e icons to the left the value must be flex-end
 */

export const RowHeadingIcon: FC<Props> = ({
  heading,
  gap,
  headingColor,
  headingFont,
  headingFontSize,
  headingFontWeight,
  headingLineHeight,
  icon,
  iconPosition,
  justifyContent,
}) => {
  return (
    <FlexibleRow gap={gap} flexDirection={iconPosition} alignItems="center" justifyContent={justifyContent}>
      <Heading6
        customcolor={headingColor}
        font={headingFont}
        fontSize={headingFontSize}
        lineHeight={headingLineHeight}
        fontWeight={headingFontWeight || fontWeights.bolder}
      >
        {heading}
      </Heading6>
      {icon}
    </FlexibleRow>
  );
};
