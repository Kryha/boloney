import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { BadgeBlock, BaseColumn, Card, CenteredImage, fadeIn, GeneralText, Heading2 } from "../../atoms";
import { breakpoints, lineHeights, spacing } from "../../design";
import { PrimaryButtonWrapper } from "../buttons";

interface PowerUpWrapperProps {
  isHoverEnabled: boolean;
  isImageHidden?: boolean;
}
interface PowerUpImageProps {
  isImageHidden: boolean;
}

export const PowerUpImage = styled(CenteredImage)<PowerUpImageProps>`
  ${({ isImageHidden }) =>
    isImageHidden
      ? "display: none;"
      : css`
          animation: ${fadeIn} 0.5s forwards;
        `}
`;

export const FullHeightColumn = styled(BaseColumn)`
  height: 100%;
`;

export const PowerUpContent = styled(FullHeightColumn)<PowerUpWrapperProps>`
  ${({ isHoverEnabled }) =>
    isHoverEnabled &&
    `
      gap: ${spacing.sm};
      justify-content: flex-end;
    `};
`;

export const PowerUpContentHover = styled(PowerUpContent)`
  ${GeneralText},${Heading2} {
    opacity: 0;
    animation: ${fadeIn} 0.5s forwards;
  }
`;

export const PowerUpButtonWrapper = styled.div`
  height: ${lineHeights.primaryButton.md};
  @media (max-width: ${breakpoints.md}) {
    height: ${lineHeights.primaryButton.sm};
  }
  @media (min-width: ${breakpoints.xxl}) {
    height: ${lineHeights.primaryButton.lg};
  }
  ${PrimaryButtonWrapper} {
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;

export const PowerUpCardWrapper = styled(Card)<PowerUpWrapperProps>`
  position: relative;
  ${BadgeBlock} {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  :hover {
    ${PowerUpContentHover} {
      opacity: 1;
    }
    ${PowerUpContent} {
      ${({ isHoverEnabled }) => !isHoverEnabled && "display: none;"}
    }
  }
  :not(:hover) {
    ${PowerUpContentHover} {
      display: none;
    }
  }
`;
