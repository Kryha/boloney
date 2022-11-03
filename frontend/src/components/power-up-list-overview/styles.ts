import styled from "@emotion/styled";

import { color } from "../../design";
import { Heading2 } from "../atoms";

interface Props {
  showOverview: boolean;
}

export const PowerUpListOverviewWrapper = styled.div<Props>`
  display: flex;
  gap: 16px;
  width: 96vw;
  flex-wrap: wrap;
  display: ${({ showOverview }) => !showOverview && "none"};
`;

export const PowerUpCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;

  width: clamp(171px, 17.5vw + 3px, 339px);
  height: clamp(272px, 19.79vw + 82px, 462px);

  background: #eeeeea;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

export const PowerUpImage = styled.img`
  overflow: hidden;
  width: 100%;
  height: auto;
`;

export const PowerUpInfo = styled.section`
  position: absolute;
  bottom: 10px;
  left: 20px;
  ${Heading2} {
    width: clamp(141px, 14.48vw + 2px, 280px);
    overflow: hidden;
    overflow-wrap: break-word;
  }
`;

export const LargePowerUpImage = styled.img``;
