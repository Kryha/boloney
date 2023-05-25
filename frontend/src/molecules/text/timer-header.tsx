import { FC } from "react";
import { BaseRow, BodyText, Heading6 } from "../../atoms";
import { FontProps } from "../../design";
import { TimerHeaderDivider } from "./styles";

interface Props {
  time?: string;
  heading?: string;
  gap?: string;
  timeFont?: string;
  timeFontWeight?: string;
  timeFontSize?: FontProps;
  timeLineHeight?: FontProps;
  timeColor?: string;
  headingFont?: string;
  headingFontWeight?: string;
  headingFontSize?: FontProps;
  headingLineHeight?: FontProps;
  headingColor?: string;
  dividerColor?: string;
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {string} time - time / general text
 * @param {string} heading - The main heading
 * @param {string} gap - gap between components
 * @param {string} timeFont - font for the time / general text heading
 * @param {string} timeFontWeight - font-weight for the time / general text heading
 * @param {FontProps} timeFontSize - font-size for the time / general text heading
 * @param {FontProps} timeLineHeight - line-height for the time / general text heading
 * @param {string} timeColor - color for the time / general text
 * @param {string} headingFont- font for the heading text heading
 * @param {FontProps} headingFontWeight - font-weight for the heading text heading
 * @param {FontProps} headingFontSize- font-size for the heading text heading
 * @param {string} headingLineHeight- line-height for the heading text heading
 * @param {string} headingColor - color for the heading text
 * @param {string} dividerColor - color for the divider
 */

export const TimerHeader: FC<Props> = ({
  time,
  heading,
  gap,
  timeColor,
  timeFont,
  timeFontSize,
  timeFontWeight,
  timeLineHeight,
  headingColor,
  headingFont,
  headingFontSize,
  headingFontWeight,
  headingLineHeight,
  dividerColor,
}) => {
  return (
    <BaseRow gap={gap} alignItems="center">
      <BodyText customcolor={timeColor} font={timeFont} fontSize={timeFontSize} lineHeight={timeLineHeight} fontWeight={timeFontWeight}>
        {time}
      </BodyText>
      <TimerHeaderDivider customcolor={dividerColor} />
      <Heading6
        customcolor={headingColor}
        font={headingFont}
        fontSize={headingFontSize}
        lineHeight={headingLineHeight}
        fontWeight={headingFontWeight}
      >
        {heading}
      </Heading6>
    </BaseRow>
  );
};
