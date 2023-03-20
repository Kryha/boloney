import styled from "@emotion/styled";
import { color } from "../../design/color";
import { fonts, fontSizes, FontProps, fontWeights, lineHeights, TransformText } from "../../design/font";
import { breakpoints } from "../../design/measurements";

export interface LinkProps {
  customColor?: string;
  fontWeight?: string;
  fontSize?: FontProps;
  lineHeight?: FontProps;
  font?: string;
  transformText?: TransformText;
}

export const LinkText = styled.a<LinkProps>`
  display: inline-block;
  text-decoration: none;
  margin-right: 0px;
  padding-top: 0.1em;
  font-family: ${({ font }): string => font || fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.light};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.tiny)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.small)};
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.tiny)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.small)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.tiny)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.small)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
  }
  .bold {
    color: ${({ customColor }): string => customColor || color.black};
    background-color: transparent;
  }
  cursor: pointer;
  &:after {
    display: block;
    content: "";
    border-bottom: 1px solid ${({ customColor }): string => customColor || color.black};
    transform: scaleX(1);
    transition: transform 250ms ease-in-out;
    transform-origin: bottom left;
  }
  &:hover:after {
    transform: scaleX(0);
    transform-origin: 0 100%;
  }
`;

export const HyperLink = styled.a``;
