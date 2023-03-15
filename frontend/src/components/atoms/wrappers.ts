import styled from "@emotion/styled";

import { color, fontWeight, margins, opacity, zIndex } from "../../design";
import { LinkContainer, PrimaryButtonWrapper } from "../buttons/styles";
import { FormHeadingText, GeneralText, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, IntroText, Paragraph } from "./text";

interface TextProps {
  customColor?: string;
}

export const PageTitleWrapper = styled.div`
  margin-top: ${margins.large0};
  margin-left: ${margins.small3};
  ${Heading4} {
    margin-bottom: 55px;
    margin-top: 50px;
    max-width: 45.27vw;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margins.medium0};
`;

export const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: normal;
  z-index: ${zIndex.inFront};
`;

export const OverlayTransparent = styled.div`
  opacity: ${opacity.overlay};
  background: ${color.lightGrey};
  height: 100vh;
  width: 100vw;
`;

interface GeneralContentWrapperProps {
  withoutSideMargins?: boolean;
}

export const GeneralContentWrapper = styled.div<GeneralContentWrapperProps>`
  margin-left: ${({ withoutSideMargins }) => (withoutSideMargins ? 0 : margins.large0)};
  margin-top: ${margins.large3};
  ${Heading1} {
    margin-top: ${margins.small0};
    margin-bottom: ${margins.small0};
  }
  ${Heading2} {
    margin-bottom: ${margins.small0};
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
  margin-left: ${margins.large0};
  ${FormHeadingText} {
    margin-bottom: ${margins.small0};
  }
  ${GeneralText} {
    margin-left: ${margins.medium1};
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
  ${Paragraph} {
    margin-bottom: ${margins.medium0};
  }
  ${LinkContainer} {
    margin-top: ${margins.small3};
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BottomButtonWrapper = styled.section`
  ${PrimaryButtonWrapper} {
    position: fixed;
    bottom: 11vh;
    left: 12.5vw;
    margin-left: 1px;
    z-index: ${zIndex.modal};
  }
`;

export const NumberedListSection = styled.section`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.bolder};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  :first-letter {
    text-transform: capitalize;
  }
  counter-reset: css-counter 0;
  ${Heading1} {
    counter-increment: css-counter 1;
    padding-left: 40px;
  }
  ${Heading1}:after {
    content: counter(css-counter, decimal-leading-zero) ""; /* Apply counter before children's content. */
  }
`;
