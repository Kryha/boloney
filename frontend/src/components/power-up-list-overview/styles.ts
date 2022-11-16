import styled from "@emotion/styled";

import { color, margins } from "../../design";
import { GeneralText, Heading2 } from "../atoms";
import { LinkContainer, PrimaryButtonWrapper } from "../buttons/styles";

interface WrapperProps {
  powerUpsAmount: number;
}

export const PowerUpListOverviewWrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  display: flex;
  gap: ${margins.small4};
  flex-wrap: wrap;
  justify-content: ${({ powerUpsAmount }) => (powerUpsAmount <= 5 ? "center" : "flex-start")};
  align-items: center;
`;
export const PowerUpInfoWrapper = styled.section``;

export const PowerUpCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  width: clamp(171px, 17.5vw + 3px, 339px);
  height: clamp(272px, 19.79vw + 82px, 462px);
  background: ${color.offWhite};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: ${margins.small2};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  ${PrimaryButtonWrapper} {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  :not(:hover) {
    ${LinkContainer} {
      display: none;
    }
  }
  :hover {
    ${GeneralText} {
      display: none;
    }
  }
`;

export const PowerUpImage = styled.img`
  overflow: hidden;
  width: 100%;
  height: auto;
`;

export const PowerUpInfoContainer = styled.div`
  position: absolute;
  left: ${margins.small5};
  bottom: ${margins.small5};
  width: 100%;
  ${Heading2} {
    width: clamp(141px, 14.48vw + 2px, 280px);
    overflow: hidden;
    overflow-wrap: break-word;
  }
`;
