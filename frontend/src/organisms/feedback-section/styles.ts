import styled from "@emotion/styled";
import { Heading2, Heading6 } from "../../atoms";
import { spacing } from "../../design";

export const TitleSection = styled.section`
  margin-bottom: ${spacing.sm};
  margin-left: ${spacing.ms};
  ${Heading6} {
    margin-bottom: ${spacing.s};
  }
`;

export const FeedbackWrapper = styled.div`
  width: 100%;
  margin-top: ${spacing.xl};
  ${Heading2} {
    margin-left: ${spacing.ms};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;
