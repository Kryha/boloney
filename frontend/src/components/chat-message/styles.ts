import styled from "@emotion/styled";
import { margins } from "../../design";

export const MessageListWrapper = styled.section`
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;
`;

export const MessageListContainer = styled.div`
  overflow: auto;
  transform: rotate(180deg);
  direction: rtl;
  margin-top: ${margins.small5};
`;
