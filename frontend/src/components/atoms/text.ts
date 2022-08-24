import styled from "styled-components";

import { color, fontWeight, fontSize } from "../../design";

interface TextProps {
  customColor?: string;
}

export const Heading1 = styled.h1<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: ${fontSize.large};
  line-height: 170px;
  letter-spacing: -0.02em;
  color: transparent;
  ${({ customColor }): string => `-webkit-text-stroke: 1px ${customColor || color.black};`};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading2 = styled.h2<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: ${fontSize.medium};
  line-height: 50px;
  ${({ customColor }): string => `color: ${customColor || color.black};`};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading3 = styled.h3<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: ${fontSize.small4};
  line-height: 34px;
  ${({ customColor }): string => `color: ${customColor || color.black};`};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading4 = styled.h4<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: clamp(${fontSize.small0}, 1vw, ${fontSize.small2});
  line-height: 28px;
  ${({ customColor }): string => `color: ${customColor || color.black};`};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading5 = styled.h5<TextProps>`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.bolder};
  font-size: ${fontSize.small1};
  line-height: 24px;
  ${({ customColor }): string => `color: ${customColor || color.black};`};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Paragraph = styled.p<TextProps>`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.small1};
  line-height: 24px;
  letter-spacing: -0.01em;
  ${({ customColor }): string => `color: ${customColor || color.black};`};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const GeneralText = styled.h3<TextProps>`
  font-family: "ibm-plex-mono",sans-serif;
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.small1};
  line-height: 24px;
  letter-spacing: -0.01em;
  ${({ customColor }): string => `color: ${customColor || color.black};`};
  :first-letter {
    text-transform: capitalize;
  }
`;
