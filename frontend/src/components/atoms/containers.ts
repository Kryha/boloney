import styled from "@emotion/styled";
import { color, fontWeight, margins } from "../../design";
import { LinkContainer } from "../buttons/styles";
import { FormHeadingText, GeneralText, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, IntroText, Paragraph } from "./text";

interface TextProps {
  customColor?: string;
}

export const GeneralContentWrapper = styled.div`
  margin-left: ${margins.large0};
  margin-top: ${margins.large0};
  ${Heading1} {
    margin-bottom: 0.3em;
  }
  ${Heading2} {
    margin-bottom: ${margins.small1};
  }
  ${Heading3} {
    margin-bottom: ${margins.small1};
  }
  ${Heading4} {
    margin-bottom: ${margins.small1};
  }
  ${Heading5} {
    margin-bottom: ${margins.small1};
  }
  ${IntroText} {
    margin-bottom: ${margins.medium0};
    width: clamp(510px, 51.04vw + 20px, 1000px);
  }
`;

export const HeadingContentWrapper = styled.div`
  margin-left: ${margins.large2};
  ${Heading6} {
    margin-bottom: ${margins.small2};
  }
  ${GeneralText} {
    width: clamp(400px, 41.67vw + 0px, 800px);
    margin-bottom: ${margins.large2};
  }
`;

export const FormContentWrapper = styled.div`
  margin-left: ${margins.large2};
  ${FormHeadingText} {
    margin-bottom: ${margins.small0};
  }
  ${GeneralText} {
    width: clamp(400px, 41.67vw + 0px, 800px);
    margin-bottom: ${margins.large0};
  }
`;

export const ListSection = styled.section<TextProps>`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.bolder};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  color: ${({ customColor }): string => customColor || color.black};
  :first-letter {
    text-transform: capitalize;
  }
  counter-reset: css-counter 0;
  ${Heading6}{
    counter-increment: css-counter 1;
  }
  ${Heading6}:after {
    content: counter(css-counter, decimal-leading-zero) ""; /* Apply counter before children's content. */
  }
  ${Paragraph} {
    margin-bottom: ${margins.medium0};
  }
  ${LinkContainer} {
    margin-top: ${margins.small3};
  }
`;
