import styled from "@emotion/styled";

import { color, margins, zIndex } from "../../design";
import { Heading4 } from "./text";

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

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${color.black};
  opacity: 0.4;
  z-index: ${zIndex.background};
`;
