import styled from "@emotion/styled";
import { Heading3 } from "../atoms";

export const SausageContainer = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  svg {
    width: 100%;
    height: 100%;
    visibility: hidden;
    overflow: visible;
  }
  ${Heading3} {
    padding-left: 10%;
    padding-bottom: 10%;
  }
  path {
    fill: none;
    stroke-linecap: round;
  }
`;
