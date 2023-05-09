import { FC } from "react";
import { BaseColumn, BodyText } from "../../atoms";
import { FontProps, TransformText } from "../../design";

interface Props {
  paragraph: string[];
  gap?: string;
  paragraphFont?: string;
  paragraphFontWeight?: string;
  paragraphFontSize?: FontProps;
  paragraphLineHeight?: FontProps;
  paragraphColor?: string;
  paragraphTransformText?: TransformText;
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {string} paragraph - The main paragraph
 * @param {string} gap - gap between components
 * @param {string} paragraphFont- font for the paragraph text paragraph
 * @param {FontProps} paragraphFontWeight - font-weight for the paragraph text paragraph
 * @param {FontProps} paragraphFontSize- font-size for the paragraph text paragraph
 * @param {string} paragraphLineHeight- line-height for the paragraph text paragraph
 * @param {string} paragraphColor - color for the paragraph text
 * @param {string} paragraphTransformText - paragraph transformation, is it capitalized / uppercase etc
 */

export const RulesParagraph: FC<Props> = ({
  paragraph,
  gap,
  paragraphColor,
  paragraphFont,
  paragraphFontSize,
  paragraphFontWeight,
  paragraphLineHeight,
  paragraphTransformText,
}) => {
  return (
    <BaseColumn gap={gap}>
      {paragraph.map((paragraph, index) => (
        <BodyText
          key={index}
          customcolor={paragraphColor}
          font={paragraphFont}
          fontSize={paragraphFontSize}
          lineHeight={paragraphLineHeight}
          fontWeight={paragraphFontWeight}
          transformText={paragraphTransformText}
        >
          {paragraph}
        </BodyText>
      ))}
    </BaseColumn>
  );
};
