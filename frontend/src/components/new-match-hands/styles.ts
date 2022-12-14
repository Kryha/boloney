import styled from "@emotion/styled";
import { margins, zIndex } from "../../design";
import { ViewProps } from "../../types";
import { HandWrapper } from "../hand/styles";

export const NewMatchHandsWrapper = styled.div<ViewProps>`
  z-index: ${zIndex.behind};
  display: flex;
  position: absolute;
  bottom: ${margins.large2};
  left: 0;
  gap: 30px;
  width: 100vw;
  ${HandWrapper} {
    width: 100%;
  }
`;

export const NewMatchHandsContainer = styled.section`
  position: absolute;
  bottom: ${margins.medium0};
  left: 0;
`;
