import styled from "@emotion/styled";

import { fonts, FontProps, fontSizes, fontWeights, lineHeights, TransformText, color, breakpoints } from "../design";

interface TextProps {
  customcolor?: string;
  font?: string;
  fontWeight?: string;
  transformText?: TransformText;
  fontSize?: FontProps;
  lineHeight?: FontProps;
  isDecorated?: boolean;
}
/*
  Here you can find the typography of the application. We will have all texts in rem, and define them with a fluid size. The minimum viewport is 960 and max is 3840
  The text is used for the following uses:
  - InfoDisplay: Birds eye view number display, and in the landing page for big text
  - LandingDisplay: Landing page for big text
  - Heading1: Action screens (when you are wrong or right for power ups, exact and boloney), Match settings, homepage, match creation and confirmation, landing page, place bid, when you’re dead, login and sign up and when time has run out.
  - Heading2: Headings within the match, on power up card names, on the end of match headings, Landing initial text information
  - Heading3: Landing info titles, Landing links, Landing descriptions,
  - Heading4: History and chat titles, place bid numbers, sign in or login text, create match confirmation title, player names in the lobby
  - Heading5: Player names
  - Heading6: Headings, titles and subtitles
  - GeneralText: General text information and paragraphs throughout the app
  - PrimaryButtonText: Primary button
  - BodyText: Rules set information
  - TooltipText: Tool tip links, Tool tips information
  - PlayerInfo: Chat usernames, history usernames, history general text, history last bid
  - TimeStamp: History Time stamp
*/

export const InfoDisplay = styled.h1<TextProps>`
  font-family: ${({ font }): string => font ?? fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.regular};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.infoDisplay.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.infoDisplay.md)};
  color: ${({ customcolor }): string => customcolor ?? color.black};

  @media (max-width: ${breakpoints.lg}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.infoDisplay.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.infoDisplay.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.infoDisplay.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.infoDisplay.lg)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }
`;

export const LandingDisplay = styled(InfoDisplay)<TextProps>`
  line-height: ${lineHeights.landingDisplay.md};

  @media (max-width: ${breakpoints.lg}) {
    line-height: ${lineHeights.landingDisplay.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    line-height: ${lineHeights.landingDisplay.lg};
  }
`;

export const Heading1 = styled.h1<TextProps>`
  font-family: ${({ font }): string => font ?? fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.regular};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.heading1.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.heading1.md)};
  letter-spacing: -0.02em;
  color: ${({ customcolor }): string => customcolor ?? color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.heading1.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.heading1.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.heading1.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.heading1.lg)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }
`;

export const Heading2 = styled.h2<TextProps>`
  font-family: ${({ font }): string => font ?? fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.regular};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.heading2.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.heading2.md)};
  color: ${({ customcolor }): string => customcolor ?? color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.heading2.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.heading2.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.heading2.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.heading2.lg)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }
  .bold {
    color: ${({ customcolor }): string => customcolor ?? color.black};
    background-color: transparent;
  }
`;

export const Heading3 = styled.h3<TextProps>`
  font-family: ${({ font }): string => font ?? fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.regular};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.heading3.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.heading3.md)};
  color: ${({ customcolor }): string => customcolor ?? color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.heading3.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.heading3.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.heading3.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.heading3.lg)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }
`;

export const Heading4 = styled.h4<TextProps>`
  font-family: ${({ font }): string => font ?? fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.regular};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.heading4.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.heading4.md)};
  color: ${({ customcolor }): string => customcolor ?? color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.heading4.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.heading4.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.heading4.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.heading4.lg)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }
`;

export const Heading5 = styled.h5<TextProps>`
  font-family: ${({ font }): string => font ?? fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.bold};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.heading5.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.heading5.md)};
  color: ${({ customcolor }): string => customcolor ?? color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.heading5.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.heading5.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.heading5.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.heading5.lg)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }
`;

export const Heading6 = styled.h6<TextProps>`
  font-family: ${({ font }): string => font ?? fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.bolder};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.heading6.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.heading6.md)};
  color: ${({ customcolor }): string => customcolor ?? color.black};
  text-transform: ${({ transformText }): string => transformText ?? "uppercase"};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.heading6.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.heading6.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.heading6.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.heading6.lg)};
  }
`;

export const GeneralText = styled.h3<TextProps>`
  font-family: ${({ font }): string => font ?? fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.light};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.generalText.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.generalText.md)};
  letter-spacing: -0.01em;
  color: ${({ customcolor }): string => customcolor ?? color.black};
  text-decoration-line: ${({ isDecorated }): string => (isDecorated ? "underline" : "none")};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.generalText.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.generalText.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.generalText.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.generalText.lg)};
  }

  .bold {
    color: ${({ customcolor }): string => customcolor ?? color.black};
    background-color: ${color.transparent};
    font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.bold};
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.generalText.md)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.generalText.md)};

    @media (max-width: ${breakpoints.md}) {
      font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.generalText.sm)};
      line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.generalText.sm)};
    }
    @media (min-width: ${breakpoints.xxl}) {
      font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.generalText.lg)};
      line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.generalText.lg)};
    }
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }
`;

export const BodyText = styled.p<TextProps>`
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

export const TooltipText = styled.h3<TextProps>`
  display: inline;
  font-family: ${({ font }): string => font ?? fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.regular};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.toolTip.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.toolTip.md)};
  color: ${({ customcolor }): string => customcolor ?? color.black};

  @media (max-width: ${breakpoints.lg}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.toolTip.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.toolTip.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.toolTip.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.toolTip.lg)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }
`;

export const PlayerInfoText = styled.h3<TextProps>`
  font-family: ${({ font }): string => font ?? fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.regular};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.playerInfo.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.playerInfo.md)};
  color: ${({ customcolor }): string => customcolor ?? color.black};

  @media (max-width: ${breakpoints.lg}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.playerInfo.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.playerInfo.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.playerInfo.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.playerInfo.lg)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }
`;

export const TimeStamp = styled.h3<TextProps>`
  font-family: ${({ font }): string => font ?? fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight ?? fontWeights.light};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.timestamp.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.timestamp.md)};
  color: ${({ customcolor }): string => customcolor ?? color.black};

  @media (max-width: ${breakpoints.lg}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.timestamp.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.timestamp.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.timestamp.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.timestamp.lg)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText ?? "capitalize"};
  }
`;
