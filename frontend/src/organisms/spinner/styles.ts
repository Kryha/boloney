import styled from "@emotion/styled";
import { BaseColumn, EllipsisText } from "../../atoms";

export const SausageSection = styled.section``;

export const SpinnerTextContainer = styled(EllipsisText)`
  margin-left: 18%;
  margin-bottom: 10%;
`;

export const SausageContainer = styled(BaseColumn)`
  width: clamp(160px, 0vw + 160px, 160px);
  height: clamp(160px, 0vw + 160px, 160px);
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
