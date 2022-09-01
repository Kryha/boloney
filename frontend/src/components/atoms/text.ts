import styled from "@emotion/styled";

import { color, fontWeight, fontSize } from "../../design";

interface TextProps {
  customColor?: string;
}

export const Heading1 = styled.h1<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: clamp(6.25rem, 12.5vw + -1.25rem, 13.75rem);
  line-height: clamp(6.25rem, 12.5vw + -1.25rem, 13.75rem);
  letter-spacing: -0.02em;
  color: ${color.pureWhite};
  -webkit-text-stroke: 1px ${({ customColor }): string => (customColor || color.white)};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading2 = styled.h2<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: clamp(1.88rem, 5.21vw + -1.25rem, 5rem);
  line-height: clamp(2.25rem, 4.79vw + -0.63rem, 5.13rem);
  color: ${({ customColor }): string => (customColor || color.black)};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading3 = styled.h3<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: clamp(1.5rem, 2.29vw + 0.13rem, 2.88rem);
  line-height: clamp(1.63rem, 2.29vw + 0.25rem, 3rem);
  color: ${({ customColor }): string => (customColor || color.black)};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading4 = styled.h4<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: clamp(1.25rem, 0.83vw + 0.75rem, 1.75rem);
  line-height: clamp(1.38rem, 1.04vw + 0.75rem, 2rem);
  color: ${({ customColor }): string => (customColor || color.black)};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading5 = styled.h5<TextProps>`
  font-family: "itc-clearface-bold";
  font-weight: ${fontWeight.bolder};
  font-size: clamp(1rem, 0.42vw + 0.75rem, 1.25rem);
  line-height: clamp(1.13rem, 0.63vw + 0.75rem, 1.5rem);
  color: ${({ customColor }): string => (customColor || color.black)};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const Heading6 = styled.h6<TextProps>`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.bolder};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  color: ${({ customColor }): string => (customColor || color.black)};
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
  color: ${({ customColor }): string => (customColor || color.black)};
  :first-letter {
    text-transform: capitalize;
  }
`;

export const GeneralText = styled.h3<TextProps>`
  font-family: ibm-plex-mono, sans-serif;
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.small1};
  line-height: 24px;
  letter-spacing: -0.01em;
  color: ${({ customColor }): string => (customColor || color.black)};
  :first-letter {
    text-transform: capitalize;
  }
`;
