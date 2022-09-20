import styled from "@emotion/styled";
import { zIndex } from "../../design";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #292929;
  opacity: 0.4;
  z-index: ${zIndex.background};
`;
