import styled from "@emotion/styled";

import { GeneralText } from "../atoms/text";
import { color, margins } from "../../design";
import { SMALL_VIEWPORT_HEIGHT } from "../../constants";

export const DieOverviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 12.5vw;
`;

interface ViewportProps {
  height: number;
}

export const DieOverviewContainer = styled.div<ViewportProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ height }) => height > SMALL_VIEWPORT_HEIGHT ? margins.small2 : margins.small0};
  width: 31.25vw;
  height: 7.198vh;
  background: transparent;
  border-right: 1px solid ${color.darkGrey};
  border-top: 1px solid ${color.darkGrey};
  ${GeneralText} {
    margin-left: ${margins.small5};
  }
`;

export const YourDiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${margins.small2};
  margin-top: -22px;
  margin-left: ${margins.small5};
`;
