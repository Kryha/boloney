import styled from "@emotion/styled";
import { SausageIcon } from "../../assets";

export const SausageContainer = styled.div`
  width: 100px;
  height: 100px;
  svg {
    width: 100%;
    height: 100%;
    visibility: hidden;
    overflow: visible;
  }
  path {
    fill: none;
    stroke-linecap: round;
    /* 	stroke-dashoffset: 12;
     stroke-dasharray: 34 88; */
  }
`;
export const LineWrap = styled(SausageIcon)``;
