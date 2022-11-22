import styled from "@emotion/styled";
import { zIndex } from "../../design";
import { ViewProps } from "../../types";
import { HandWrapper } from "../hand/styles";

export const NewGameHandsWrapper = styled.div<ViewProps>`
  z-index: ${zIndex.behind};
  display: flex;
  position: absolute;
  bottom: 30px;
  left: 0;
  gap: 30px;
  width: 100vw;
  ${HandWrapper} {
    width: 100%;
  }
`;
