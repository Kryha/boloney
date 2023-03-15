import styled from "@emotion/styled";

import { color, fontWeight } from "../../design";

interface TextProps {
  customColor?: string;
}

export const Heading0 = styled.h1<TextProps>`
  font-family: "itc-clearface-regular";
  font-weight: ${fontWeight.regular};
  font-size: clamp(11.63rem, 11.88vw + 4.5rem, 18.75rem);
  line-height: clamp(10.5rem, 11.67vw + 3.5rem, 17.5rem);
  letter-spacing: -0.02em;
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading1 = styled.h1<TextProps>`
  font-family: "itc-clearface-regular";
  font-weight: ${fontWeight.regular};
  font-size: clamp(5.63rem, 7vw + -1.25rem, 9rem);
  line-height: clamp(4.5rem, 4.05vw + 2.07rem, 6.93rem);
  letter-spacing: -0.02em;
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading2 = styled.h2<TextProps>`
  font-family: "itc-clearface-regular";
  font-weight: ${fontWeight.regular};
  font-size: clamp(1.88rem, 3.13vw + 0rem, 3.75rem);
  line-height: clamp(2.25rem, 2.71vw + 0.63rem, 3.88rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
  .bold {
    color: ${color.black};
    background-color: ${color.transparent};
  }
`;

export const Heading3 = styled.h3<TextProps>`
  font-family: "itc-clearface-regular";
  font-weight: ${fontWeight.regular};
  font-size: clamp(1.5rem, 2.29vw + 0.13rem, 2.88rem);
  line-height: clamp(1.63rem, 2.29vw + 0.25rem, 3rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading4 = styled.h4<TextProps>`
  font-family: "itc-clearface-regular";
  font-weight: ${fontWeight.regular};
  font-size: clamp(1.25rem, 0.83vw + 0.75rem, 1.75rem);
  line-height: clamp(1.38rem, 1.04vw + 0.75rem, 2rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading5 = styled.h5<TextProps>`
  font-family: "itc-clearface-regular";
  font-weight: ${fontWeight.regular};
  font-size: clamp(13.12px, 0.72vw + 6.24px, 20px);
  line-height: clamp(1.13rem, 0.63vw + 0.75rem, 1.5rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading6 = styled.h6<TextProps>`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.bolder};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const BulletList = styled.ul<TextProps>`
  list-style-type: circle;
`;

export const Paragraph = styled.p<TextProps>`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.light};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  letter-spacing: -0.01em;
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
  padding-right: 0.3em;
`;

export const GeneralText = styled.h3<TextProps>`
  :first-letter {
    text-transform: capitalize;
  }
  font-family: ibm-plex-mono, sans-serif;
  font-weight: ${fontWeight.light};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  letter-spacing: -0.01em;
  color: ${({ customColor }): string => customColor || color.black};
  .bold {
    color: ${color.black};
    background-color: ${color.transparent};
    font-weight: ${fontWeight.bold};
    font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
    line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  }
`;

export const GeneralMessageText = styled(GeneralText)`
  :first-letter {
    text-transform: none;
  }
`;

export const GeneralTextUnderlined = styled(GeneralText)`
  text-decoration-line: underline;
`;

export const IntroText = styled.h3<TextProps>`
  font-family: "itc-clearface-regular";
  font-style: normal;
  font-weight: ${fontWeight.regular};
  font-size: clamp(1.63rem, 0.63vw + 1.25rem, 2rem);
  line-height: clamp(1.88rem, 0.63vw + 1.5rem, 2.25rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const FormHeadingText = styled.h2<TextProps>`
  font-family: "itc-clearface-regular";
  font-style: normal;
  font-weight: ${fontWeight.regular};
  font-size: clamp(2rem, 2.92vw + 0.25rem, 3.75rem);
  line-height: clamp(2.13rem, 2.92vw + 0.38rem, 3.88rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const UnorderedListItems = styled.li`
  font-size: 22px;
  line-height: 26px;
  box-sizing: border-box;
  list-style: none;
  font-family: "itc-clearface-bold";
  font-style: normal;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

export const ColorSpan = styled.span<TextProps>`
  color: ${({ customColor }): string => customColor || color.black};
  font-weight: ${fontWeight.regular};
`;

export const Bold = styled.span`
  font-weight: bold;
`;

export const DefaultListItem = styled.li`
  font-family: ibm-plex-mono, sans-serif;
  font-weight: ${fontWeight.light};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  letter-spacing: -0.01em;
  color: ${color.black};
  list-style-position: outside;
`;

export const BulletContainer = styled.ul`
  padding-left: 20px;
`;
