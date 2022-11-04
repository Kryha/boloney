import styled from "@emotion/styled";

import { SMALL_VIEWPORT_HEIGHT } from "../../constants";
import { color, margins } from "../../design";
import { fadeIn } from "../atoms";
import { GeneralText } from "../atoms/text";
import { Lightning } from "../icons/styles";

export const PowerUpOverviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  margin-left: ${margins.large0};
`;

interface ViewportProps {
  height: number;
}

export const PowerUpOverviewContainer = styled.div<ViewportProps>`
  display: flex;
  align-items: flex-start;
  gap: ${({ height }) => height > SMALL_VIEWPORT_HEIGHT && margins.small2};
  width: 31.25vw;
  height: 7.198vh;
  background: transparent;
  margin-top: ${margins.small2};
  ${GeneralText} {
    color: ${color.black};
  }
  ${Lightning} {
    path {
      stroke: ${color.black};
    }
  }
  animation: ${fadeIn} 2s;
`;

export const YourPowerUpContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${margins.small2};
  margin-left: ${margins.small5};
`;

export const PowerUpOverview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
