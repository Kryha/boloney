import styled from "@emotion/styled";

import { SMALL_VIEWPORT_HEIGHT } from "../../constants";
import { color, margins } from "../../design";
import { GeneralText } from "../atoms/text";

export const PowerUpOverviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 43.75vw;
`;

interface ViewportProps {
  height: number;
}

export const PowerUpOverviewContainer = styled.div<ViewportProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ height }) => height > SMALL_VIEWPORT_HEIGHT && margins.small2};
  width: 31.25vw;
  height: 7.198vh;
  background: transparent;
  border-left: 1px solid ${color.darkGrey};
  border-top: 1px solid ${color.darkGrey};
  ${GeneralText} {
    margin-left: ${margins.small5};
  }
`;

export const YourPowerUpContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${margins.small2};
  margin-top: -45px;
  margin-left: ${margins.small5};
`;
