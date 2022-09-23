import styled from "@emotion/styled";
import { margins } from "../../design";
import { FormHeadingText, GeneralText, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, IntroText } from "./text";

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
