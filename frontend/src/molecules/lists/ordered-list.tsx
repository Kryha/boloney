import { FC } from "react";
import { ListStyle, NumberListItem, OrderedNumberList } from "../../atoms";
import { FontProps, TransformText } from "../../design";

interface Props {
  listStyle?: ListStyle;
  listItems: string[];
  font?: string;
  fontWeight?: string;
  fontSize?: FontProps;
  lineHeight?: FontProps;
  customcolor?: string;
  transformText?: TransformText;
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {ListStyle} listStyle - The style of the list i.e bullet points, decimal
 * @param {string} listItems - The list of items
 * @param {string} font - font for the list
 * @param {string} fontWeight - font-weight for the list
 * @param {FontProps} fontSize - font-size for the list
 * @param {FontProps} lineHeight - line-height for the list
 * @param {string} customcolor - color for the list
 * @param {string} transformText - list transformText, is it capitalized / uppercase etc
 */

export const OrderedList: FC<Props> = ({ listStyle, listItems, font, fontSize, fontWeight, lineHeight, customcolor, transformText }) => {
  return (
    <OrderedNumberList
      listStyle={listStyle}
      font={font}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      customcolor={customcolor}
      transformText={transformText}
    >
      {listItems.map((item, index) => (
        <NumberListItem key={index}>{item}</NumberListItem>
      ))}
    </OrderedNumberList>
  );
};
