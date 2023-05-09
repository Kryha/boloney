import styled from "@emotion/styled";
import { breakpoints, color, FontProps, fonts, fontSizes, fontWeights, lineHeights, TransformText } from "../design";

export type ListStyle =
  | "disc"
  | "circle"
  | "square"
  | "decimal"
  | "decimal-leading-zero"
  | "lower-roman"
  | "upper-roman"
  | "lower-greek"
  | "lower-latin"
  | "upper-latin"
  | "armenian"
  | "georgian"
  | "lower-alpha"
  | "upper-alpha"
  | "none";

export type ListPosition = "inside" | "outside" | "initial" | "inherit";

interface OrderedListProps {
  listStyle?: ListStyle;
  customcolor?: string;
  font?: string;
  fontWeight?: string;
  transformText?: TransformText;
  fontSize?: FontProps;
  lineHeight?: FontProps;
  isDecorated?: boolean;
  orderListPosition?: ListPosition;
}

export const DefaultListItem = styled.li`
  color: ${color.black};
  list-style-position: outside;
`;

export const OrderedNumberList = styled.ol<OrderedListProps>`
  list-style-type: ${({ listStyle }) => listStyle ?? "decimal"};
  font-family: ${({ font }): string => font ?? fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.light};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.body.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.body.md)};
  color: ${({ customcolor }): string => customcolor ?? color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.body.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.body.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.body.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.body.lg)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }
`;

export const NumberListItem = styled.li``;
