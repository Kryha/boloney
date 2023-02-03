import styled from "@emotion/styled";
import { GeneralMessageText, Heading3 } from "../atoms";

export const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 194px 40px 80px;
  gap: 10px;
  margin-top: -3.6vh;
`;

export const NumberedParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0px 0px;
  ${Heading3} {
    margin-top: 10px;
    width: 43.5vw;
  }
`;

export const NeutralContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  ${GeneralMessageText} {
    width: 32.63vw;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px 0px 10px 20px;
    gap: 10px;
  }
`;
