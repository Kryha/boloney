import styled from "@emotion/styled";
import { MINIMUM_POWER_UP_WIDTH_VIEW } from "../../constants";
import { color, margins, zIndex } from "../../design";
import { LinkContainer, PrimaryButtonWrapper } from "../../molecules";

import { fadeIn, fadeOut, GeneralText, Heading2, RadioInput } from "../atoms";
import { CheckboxContainer } from "../checkbox/styles";

interface PowerUpImageProps {
  isImageLarge: boolean;
}

export const PowerUpImage = styled.img<PowerUpImageProps>`
  width: ${({ isImageLarge }) => (isImageLarge ? "clamp(240px, 20.83vw + 40px, 440px)" : "clamp(200px, 18.75vw + 20px, 380px)")};
  margin-top: ${({ isImageLarge }) => (isImageLarge ? "clamp(-70px, -2.08vw + -50px, -90px)" : "-16vh")};
  height: auto;
`;

export const PowerUpImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PowerUpInfoWrapper = styled.section``;

export const DescriptionText = styled(GeneralText)`
  width: clamp(141px, 14.48vw + 2px, 280px);
`;

export const DescriptionExample = styled(DescriptionText)`
  color: ${color.darkGrey};
`;

export const SeeDetailsText = styled(GeneralText)`
  width: clamp(141px, 14.48vw + 2px, 280px);
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

interface PowerUpProps {
  width: number;
  isPowerUpInUse: boolean;
  canSelectPowerUp: boolean;
}

export const PowerUpCardWrapper = styled.div<PowerUpProps>`
  position: relative;
  left: 0;
  bottom: 0;
  width: clamp(171px, 17.5vw + 3px, 339px);
  height: 42.87vh;
  min-height: 330px;
  ${PrimaryButtonWrapper} {
    margin-left: ${({ width }) => (width <= MINIMUM_POWER_UP_WIDTH_VIEW ? "-7px" : "0px")};
  }
  ${RadioInput} {
    margin-left: ${({ width }) => (width <= MINIMUM_POWER_UP_WIDTH_VIEW ? "-7px" : "0px")};
  }
  ${PowerUpInfoContainer} {
    bottom: ${({ canSelectPowerUp }) => (canSelectPowerUp ? "76px" : margins.small5)};
  }
  cursor: pointer;
  :not(:hover) {
    ${DescriptionText} {
      display: none;
    }
    ${DescriptionExample} {
      display: none;
    }
    ${PrimaryButtonWrapper} {
      display: none;
    }
  }
  :hover {
    ${DescriptionText}, ${DescriptionExample}, ${Heading2} {
      opacity: 0;
      animation: ${fadeIn} 0.4s 0.5s forwards;
    }
    ${PowerUpImage} {
      animation: ${fadeOut};
      animation-duration: 0.4s;
      animation-fill-mode: forwards;
    }
    ${PowerUpInfoContainer} {
      bottom: ${({ isPowerUpInUse, canSelectPowerUp }) => (isPowerUpInUse || canSelectPowerUp ? "76px" : margins.small5)};
      max-height: clamp(180px, 19.79vw - 10px, 370px);
      overflow: scroll;
    }
  }
`;

export const ButtonWrapper = styled.div`
  overflow: hidden;
  width: clamp(171px, 17.5vw + 3px, 339px);
  margin-top: -60px;
  bottom: 0;
  position: absolute;
`;

export const RadioButtonWrapper = styled.div`
  overflow: hidden;
  width: clamp(171px, 17.5vw + 3px, 339px);
  margin-top: -60px;
  margin-left: 16px;
  position: absolute;
  z-index: ${zIndex.inFront};
`;

export const PowerUpCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px;
  width: clamp(171px, 17.5vw + 3px, 339px);
  height: 42.87vh;
  min-height: 330px;
  background: ${color.cloudWhite};
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
  ${RadioInput} {
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

export const PowerUpCardWrapperCheckbox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${margins.small4};
  flex-direction: column;
  padding: 0px;
  width: clamp(171px, 17.5vw + 3px, 339px);
  height: 42.87vh;
  min-height: 330px;
  background: ${color.cloudWhite};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: ${margins.small2};
  overflow: scroll;
  cursor: pointer;
  ${CheckboxContainer} {
    margin-bottom: 1vh;
    margin-left: 1vw;
  }
`;

export const PowerUpInfoContainerCheckbox = styled.div`
  width: 100%;
  padding-left: 1vw;
  ${Heading2} {
    width: clamp(141px, 14.48vw + 2px, 280px);
    overflow: hidden;
    overflow-wrap: break-word;
    font-size: clamp(28px, 0.73vw + 21px, 35px);
  }
`;

export const PowerUpImageSmall = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
`;

export const CheckboxArea = styled.div``;
