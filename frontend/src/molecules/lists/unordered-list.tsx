import { FC } from "react";
import { OrderedList } from "./ordered-list";
import { UnorderedOrderedList } from "./styles";
import { BaseColumn, ListStyle } from "../../atoms";
import { FontProps, TransformText } from "../../design";

interface Props {
  listStyle?: ListStyle;
  listHeading: string[];
  listItems: string[];
  font?: string;
  listItemFontWeight?: string;
  listHeadingFontWeight?: string;
  fontSize?: FontProps;
  lineHeight?: FontProps;
  customcolor?: string;
  transformText?: TransformText;
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {ListStyle} listStyle - The style of the list i.e bullet points, decimal
 * @param {string} listHeading - An array of list headings.
 * @param {string} listItems - An array of list of items.
 * @param {string} font - font for the list
 * @param {string} listItemFontWeight - font-weight for the list items
 * @param {string} listHeadingFontWeight - font-weight for the list headings
 * @param {FontProps} fontSize - font-size for the list
 * @param {FontProps} lineHeight - line-height for the list
 * @param {string} customcolor - color for the list
 * @param {string} transformText - list transformText, is it capitalized / uppercase etc
 */

export const UnorderedList: FC<Props> = ({
  listHeading,
  listStyle,
  listItems,
  font,
  fontSize,
  listHeadingFontWeight,
  listItemFontWeight,
  lineHeight,
  customcolor,
  transformText,
}) => {
  return (
    <BaseColumn>
      <UnorderedOrderedList>
        <OrderedList
          font={font}
          customcolor={customcolor}
          fontSize={fontSize}
          fontWeight={listHeadingFontWeight}
          lineHeight={lineHeight}
          transformText={transformText}
          listStyle={listStyle}
          listItems={listHeading}
        />
      </UnorderedOrderedList>
      <OrderedList
        font={font}
        customcolor={customcolor}
        fontSize={fontSize}
        fontWeight={listItemFontWeight}
        lineHeight={lineHeight}
        transformText={transformText}
        listStyle={listStyle}
        listItems={listItems}
      />
    </BaseColumn>
  );
};
