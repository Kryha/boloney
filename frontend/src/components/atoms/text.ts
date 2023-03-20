import styled from "@emotion/styled";

import { fonts, FontProps, fontSizes, fontWeights, lineHeights, TransformText, color, breakpoints } from "../../design";

interface TextProps {
  customColor?: string;
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
  font-family: ${fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.regular};
  font-size: ${fontSizes.infoDisplay.md};
  line-height: ${lineHeights.infoDisplay.md};
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.lg}) {
    font-size: ${fontSizes.infoDisplay.sm};
    line-height: ${lineHeights.infoDisplay.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.infoDisplay.lg};
    line-height: ${lineHeights.infoDisplay.lg};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
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
  font-family: ${fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.regular};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.heading1.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.heading1.md)};
  letter-spacing: -0.02em;
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.heading1.sm};
    line-height: ${lineHeights.heading1.sm};
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.sm : fontSizes.heading1.sm)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.sm : lineHeights.heading1.sm)};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${({ fontSize }): string => (fontSize ? fontSize.lg : fontSizes.heading1.lg)};
    line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.lg : lineHeights.heading1.lg)};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
  }
`;

export const Heading2 = styled.h2<TextProps>`
  font-family: ${fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.regular};
  font-size: ${fontSizes.heading2.md};
  line-height: ${lineHeights.heading2.md};
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.heading2.sm};
    line-height: ${lineHeights.heading2.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.heading2.lg};
    line-height: ${lineHeights.heading2.lg};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
  }
  .bold {
    color: ${color.black};
    background-color: transparent;
  }
`;

export const Heading3 = styled.h3<TextProps>`
  font-family: ${fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.regular};
  font-size: ${fontSizes.heading3.md};
  line-height: ${lineHeights.heading3.md};
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.heading3.sm};
    line-height: ${lineHeights.heading3.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.heading3.lg};
    line-height: ${lineHeights.heading3.lg};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
  }
`;

export const Heading4 = styled.h4<TextProps>`
  font-family: ${fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.regular};
  font-size: ${fontSizes.heading4.md};
  line-height: ${lineHeights.heading4.md};
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.heading4.sm};
    line-height: ${lineHeights.heading4.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.heading4.lg};
    line-height: ${lineHeights.heading4.lg};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
  }
`;

export const Heading5 = styled.h5<TextProps>`
  font-family: ${fonts.secondary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.bold};
  font-size: ${fontSizes.heading5.md};
  line-height: ${lineHeights.heading5.md};
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.heading5.sm};
    line-height: ${lineHeights.heading5.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.heading5.lg};
    line-height: ${lineHeights.heading5.lg};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
  }
`;

export const Heading6 = styled.h6<TextProps>`
  font-family: ${fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.bolder};
  font-size: ${fontSizes.heading6.md};
  line-height: ${fontSizes.heading6.md};
  color: ${({ customColor }): string => customColor || color.black};
  text-transform: ${({ transformText }): string => transformText || "uppercase"};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.heading6.sm};
    line-height: ${lineHeights.heading6.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.heading6.lg};
    line-height: ${lineHeights.heading6.lg};
  }
`;

export const GeneralText = styled.h3<TextProps>`
  font-family: ${fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.light};
  font-size: ${({ fontSize }): string => (fontSize ? fontSize.md : fontSizes.generalText.md)};
  line-height: ${({ lineHeight }): string => (lineHeight ? lineHeight.md : lineHeights.generalText.md)};
  letter-spacing: -0.01em;
  color: ${({ customColor }): string => customColor || color.black};
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
    color: ${color.black};
    background-color: ${color.transparent};
    font-weight: ${fontWeights.bold};
    font-size: ${fontSizes.generalText.md};
    line-height: ${lineHeights.generalText.md};

    @media (max-width: ${breakpoints.md}) {
      font-size: ${fontSizes.generalText.sm};
      line-height: ${lineHeights.generalText.sm};
    }
    @media (min-width: ${breakpoints.xxl}) {
      font-size: ${fontSizes.generalText.lg};
      line-height: ${lineHeights.generalText.lg};
    }
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
  }
`;

export const PrimaryButtonText = styled.h3<TextProps>`
  font-family: ${fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.regular};
  font-size: ${fontSizes.primaryButton.md};
  line-height: ${lineHeights.primaryButton.md};
  letter-spacing: -0.02em;
  text-transform: ${({ transformText }): string => transformText || "uppercase"};
  max-height: 44px;
  margin-top: -10px;
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.primaryButton.sm};
    line-height: ${lineHeights.primaryButton.sm};
  }

  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.primaryButton.lg};
    line-height: ${lineHeights.primaryButton.lg};
  }
`;

export const BodyText = styled.p<TextProps>`
  font-family: ${fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.light};
  font-size: ${fontSizes.body.md};
  line-height: ${lineHeights.body.md};
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.md}) {
    font-size: ${fontSizes.body.sm};
    line-height: ${lineHeights.body.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.body.lg};
    line-height: ${lineHeights.body.lg};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
  }
`;

export const TooltipText = styled.h3<TextProps>`
  font-family: ${fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.regular};
  font-size: ${fontSizes.toolTip.md};
  line-height: ${lineHeights.toolTip.md};
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.lg}) {
    font-size: ${fontSizes.toolTip.sm};
    line-height: ${lineHeights.toolTip.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.toolTip.lg};
    line-height: ${lineHeights.toolTip.lg};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
  }
`;

export const PlayerInfoText = styled.h3<TextProps>`
  font-family: ${fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.regular};
  font-size: ${fontSizes.playerInfo.md};
  line-height: ${fontSizes.playerInfo.md};
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.lg}) {
    font-size: ${fontSizes.playerInfo.sm};
    line-height: ${lineHeights.playerInfo.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.playerInfo.lg};
    line-height: ${lineHeights.playerInfo.lg};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
  }
`;

export const TimeStamp = styled.h3<TextProps>`
  font-family: ${fonts.primary};
  font-weight: ${({ fontWeight }): string => fontWeight || fontWeights.light};
  font-size: ${fontSizes.timestamp.md};
  line-height: ${lineHeights.timestamp.md};
  color: ${({ customColor }): string => customColor || color.black};

  @media (max-width: ${breakpoints.lg}) {
    font-size: ${fontSizes.timestamp.sm};
    line-height: ${lineHeights.timestamp.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    font-size: ${fontSizes.timestamp.lg};
    line-height: ${lineHeights.timestamp.lg};
  }

  :first-letter {
    text-transform: ${({ transformText }): string => transformText || "capitalize"};
  }
`;
