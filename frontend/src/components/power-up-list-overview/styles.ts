import styled from "@emotion/styled";
import { MAX_POWER_UP_VIEW_AMOUNT, MINIMUM_POWER_UP_WIDTH_VIEW } from "../../constants";

import { color, margins } from "../../design";
import { GeneralText, Heading2 } from "../atoms";
import { PrimaryButtonWrapper } from "../buttons/styles";

interface WrapperProps {
  powerUpsAmount: number;
}

export const PowerUpListOverviewWrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  display: flex;
  gap: ${margins.small4};
  flex-wrap: wrap;
  justify-content: ${({ powerUpsAmount }) => (powerUpsAmount <= MAX_POWER_UP_VIEW_AMOUNT ? "center" : "flex-start")};
  align-items: center;
`;
export const PowerUpInfoWrapper = styled.section``;

export const PowerUpImage = styled.img`
  overflow: hidden;
  width: 100%;
  height: auto;
`;

export const DescriptionText = styled(GeneralText)``;

export const PowerUpInfoContainer = styled.div`
  position: absolute;
  left: ${margins.small5};
  bottom: ${margins.small5};
  width: 90%;
  ${Heading2} {
    width: clamp(141px, 14.48vw + 2px, 280px);
    overflow: hidden;
    overflow-wrap: break-word;
  }
`;
interface PowerUpProps {
  width: number;
  isPowerUpInUse: boolean;
}

export const PowerUpContainer = styled.div<PowerUpProps>`
  position: relative;
  left: 0;
  bottom: 0;
  width: clamp(171px, 17.5vw + 3px, 339px);
  height: clamp(272px, 19.79vw + 82px, 462px);
  ${PrimaryButtonWrapper} {
    margin-left: ${({ width }) => (width <= MINIMUM_POWER_UP_WIDTH_VIEW ? "-7px" : "0px")};
  }
  cursor: pointer;
  :not(:hover) {
    ${DescriptionText} {
      display: none;
    }
    ${PrimaryButtonWrapper} {
      display: none;
    }
  }
  :hover {
    ${GeneralText} {
      display: none;
    }
    ${PowerUpImage} {
      display: none;
    }
    ${PowerUpInfoContainer} {
      bottom: ${({ isPowerUpInUse }) => (isPowerUpInUse ? "76px" : margins.small5)};
      max-height: clamp(180px, 19.79vw + -10px, 370px);
      overflow: scroll;
    }
  }
`;
export const ButtonWrapper = styled.div`
  overflow: hidden;
  width: clamp(171px, 17.5vw + 3px, 339px);
  margin-top: -60px;
`;

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
`;
