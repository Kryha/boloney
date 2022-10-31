import styled from "@emotion/styled";

import { GeneralText } from "../atoms/text";
import { margins } from "../../design";
import { SMALL_VIEWPORT_HEIGHT } from "../../constants";

export const DieOverviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
`;

interface ViewportProps {
  height: number;
}

export const DieOverviewContainer = styled.div<ViewportProps>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ height }) => (height > SMALL_VIEWPORT_HEIGHT ? margins.small2 : margins.small0)};
  width: 31.25vw;
  background: transparent;
  margin-top: ${margins.small2};
  ${GeneralText} {
    margin-left: ${margins.large1};
  }
`;

export const YourDiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: ${margins.small5};
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: ${margins.small2};
`;
