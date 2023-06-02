import { FC } from "react";
import { OrderedList } from "./ordered-list";
import { BaseColumn, ListStyle } from "../../atoms";
import { RulesParagraph } from "../text";
import { FontProps, TransformText } from "../../design";

interface Props {
  paragraphs: string[];
  listItems: string[];
  listStyle?: ListStyle;
  gap?: string;
  paragraphGap?: string;
  font?: string;
  fontWeight?: string;
  fontSize?: FontProps;
  lineHeight?: FontProps;
  customcolor?: string;
  transformText?: TransformText;
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {string} paragraphs - An array of paragraphs
 * @param {string} listItems - An array of the list of items
 * @param {ListStyle} listStyle - The style of the list i.e bullet points, decimal
 * @param {string} gap - gap between components
 * @param {string} paragraphGap - gap between paragraphs
 * @param {string} font - font for the paragraph and lists
 * @param {string} fontWeight - font-weight for the paragraph and lists
 * @param {FontProps} fontSize - font-size for the paragraph and lists
 * @param {FontProps} lineHeight - line-height for the paragraph and lists
 * @param {string} customcolor - color for the paragraph and lists
 * @param {string} transformText - paragraph and lists transformText, is it capitalized / uppercase etc
 */

export const ParagraphList: FC<Props> = ({
  paragraphs,
  listItems,
  gap,
  font,
  fontSize,
  fontWeight,
  lineHeight,
  customcolor,
  transformText,
  paragraphGap,
  listStyle,
}) => {
  return (
    <BaseColumn gap={gap}>
      <RulesParagraph
        paragraph={paragraphs}
        gap={paragraphGap}
        paragraphFont={font}
        paragraphColor={customcolor}
        paragraphFontSize={fontSize}
        paragraphFontWeight={fontWeight}
        paragraphLineHeight={lineHeight}
        paragraphTransformText={transformText}
      />
      <OrderedList
        listItems={listItems}
        font={font}
        customcolor={customcolor}
        fontSize={fontSize}
        fontWeight={fontWeight}
        lineHeight={lineHeight}
        transformText={transformText}
        listStyle={listStyle}
      />
    </BaseColumn>
  );
};
