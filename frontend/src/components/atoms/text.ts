import styled from "@emotion/styled";

import { color, fontWeight } from "../../design";

interface TextProps {
  customColor?: string;
}

export const Heading1 = styled.h1<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: clamp(5.63rem, 11.46vw + -1.25rem, 12.5rem);
  line-height: clamp(5.63rem, 11.46vw + -1.25rem, 12.5rem);
  letter-spacing: -0.02em;
  color: ${color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading2 = styled.h2<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: clamp(1.88rem, 3.13vw + 0rem, 3.75rem);
  line-height: clamp(2.25rem, 2.71vw + 0.63rem, 3.88rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading3 = styled.h3<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: clamp(1.5rem, 2.29vw + 0.13rem, 2.88rem);
  line-height: clamp(1.63rem, 2.29vw + 0.25rem, 3rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading4 = styled.h4<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: clamp(1.25rem, 0.83vw + 0.75rem, 1.75rem);
  line-height: clamp(1.38rem, 1.04vw + 0.75rem, 2rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading5 = styled.h5<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: clamp(1rem, 0.42vw + 0.75rem, 1.25rem);
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
`;

export const GeneralText = styled.h3<TextProps>`
  font-family: ibm-plex-mono, sans-serif;
  font-weight: ${fontWeight.light};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  letter-spacing: -0.01em;
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const IntroText = styled.h3<TextProps>`
  font-family: "itc-clearface-bold";
  font-style: normal;
  font-weight: ${fontWeight.bolder};
  font-size: clamp(1.63rem, 0.63vw + 1.25rem, 2rem);
  line-height: clamp(1.88rem, 0.63vw + 1.5rem, 2.25rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const FormHeadingText = styled.h2<TextProps>`
  font-family: "itc-clearface-bold";
  font-style: normal;
  font-weight: ${fontWeight.bolder};
  font-size: clamp(2rem, 2.92vw + 0.25rem, 3.75rem);
  line-height: clamp(2.13rem, 2.92vw + 0.38rem, 3.88rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
`;

interface ColorSpanProps {
  customColor: keyof typeof color;
}

export const ColorSpan = styled.span<ColorSpanProps>`
  color: ${({ customColor }) => color[customColor]};
`;
