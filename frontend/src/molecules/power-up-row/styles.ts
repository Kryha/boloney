import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BaseGrid, BaseIconWrapper, BodyText, Card, grow, fadeTransformUp, slideUp } from "../../atoms";

import { breakpoints, containerHeight, containerWidth, iconSize, maxHeight, opacity, powerUp, POWER_UPS_IN_VIEW } from "../../design";
import { DisabledSmallPowerUpWrapper } from "../power-up/styles";

interface PowerUpCardProps {
  amount: number;
}

interface PowerUpRowProps {
  showPowerUpAnimation: boolean;
}

export const PowerUpRowWrapper = styled(BaseGrid)<PowerUpCardProps>`
  flex-wrap: wrap;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  ${DisabledSmallPowerUpWrapper} {
    ${BaseIconWrapper} {
      ${({ amount }) =>
        amount > POWER_UPS_IN_VIEW &&
        `
          width: ${powerUp.xxs};
          height: ${powerUp.xxs};
          > svg {
            width: ${powerUp.xxs};
            height: ${powerUp.xxs};
          }
        `}
    }
  }
  :hover {
    animation: ${slideUp};
    animation-duration: 1s;
    animation-delay: 0s;
    animation-fill-mode: forwards;
  }
  ${Card} {
    animation-name: ${grow};
    animation-timing-function: ease-in;
    animation-duration: 0.9s;
    animation-fill-mode: forwards;
    opacity: ${opacity.hidden};
    width: ${({ amount }): string => (amount > POWER_UPS_IN_VIEW ? powerUp.md : containerWidth.xs)};
    height: ${({ amount }): string => (amount > POWER_UPS_IN_VIEW ? powerUp.lg : containerHeight.sm)};
    min-height: ${({ amount }): string => (amount > POWER_UPS_IN_VIEW ? powerUp.lg : maxHeight.sm)};

    @media screen and (min-device-width: ${breakpoints.xl}) and (max-device-width: ${breakpoints.xxl}) {
      width: ${({ amount }): string => (amount > POWER_UPS_IN_VIEW ? powerUp.sm : containerWidth.xs)};
      min-height: ${({ amount }): string => (amount > POWER_UPS_IN_VIEW ? powerUp.lg : maxHeight.sm)};
    }

    @media (min-width: ${breakpoints.xxl}) {
      min-height: ${({ amount }): string => (amount > POWER_UPS_IN_VIEW ? powerUp.lg : maxHeight.lg)};
    }
  }
  ${Card}:nth-of-type(1) {
    animation-delay: 0.9s;
  }
  ${Card}:nth-of-type(2) {
    animation-delay: 1s;
  }
  ${Card}:nth-of-type(3) {
    animation-delay: 1.2s;
  }
  ${Card}:nth-of-type(4) {
    animation-delay: 1.3s;
  }
  ${Card}:nth-of-type(5) {
    animation-delay: 1.4s;
  }
  ${Card}:nth-of-type(6) {
    animation-delay: 1.5s;
  }
  ${Card}:nth-of-type(7) {
    animation-delay: 1.6s;
  }
  ${Card}:nth-of-type(8) {
    animation-delay: 1.7s;
  }
  ${Card}:nth-of-type(9) {
    animation-delay: 1.8s;
  }
`;

export const AddPowerUp = styled(BodyText)<PowerUpRowProps>`
  padding-left: ${iconSize.xxs};
  position: absolute;
  top: -${powerUp.xs};
  z-index: 2;
  opacity: ${opacity.hidden};
  ${({ showPowerUpAnimation }) =>
    showPowerUpAnimation &&
    css`
      animation-name: ${fadeTransformUp};
      animation-timing-function: ease-in;
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-delay: 0.8s;
    `};
`;

export const PowerUpRowContainer = styled.div``;
