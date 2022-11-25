import styled from "@emotion/styled";
import { ellipsis } from "../atoms";
import { Waiting } from "../lobby-player-status/styles";

export const SausageSection = styled.section``;
export const LoadingTextContainer = styled(Waiting)`
  margin-left: 18%;
  margin-bottom: 10%;
  &::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ${ellipsis} steps(4, end) 2000ms infinite;
    animation: ${ellipsis} steps(4, end) 2000ms infinite;
    content: "...";
    width: 0px;
  }
`;
export const SausageContainer = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  svg {
    width: 100%;
    height: 100%;
    margin-left: 10%;
    visibility: hidden;
    overflow: visible;
  }
  path {
    fill: none;
    stroke-linecap: round;
  }
`;
