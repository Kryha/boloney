import styled from "@emotion/styled";
import { PopUp, BaseColumn, BaseRow, FluidImage, BaseIconWrapper, SecondaryButtonBase, TertiaryButtonBase } from "../../atoms";
import { breakpoints, buttonSize, containerWidth, iconSize, images, popUpWidth, spacing } from "../../design";

export const ToastContentWrapper = styled(BaseRow)`
  padding: ${spacing.sm} ${spacing.s};
  width: ${containerWidth.fluid};
`;

export const ToastWrapper = styled(BaseColumn)`
  width: fit-content;
`;

export const BannerContentWrapper = styled(BaseRow)`
  padding: 0px 0px ${spacing.ms} 0px;
  @media (max-width: ${breakpoints.md}) {
    padding: ${spacing.xl} 0px ${spacing.xl} 0px;
    ${BaseIconWrapper} {
      display: none;
    }
  }
`;

export const BannerPopUp = styled(PopUp)`
  @media (max-width: ${breakpoints.md}) {
    width: ${popUpWidth.xxl};
    padding: ${spacing.md} ${spacing.md} ${spacing.s} ${spacing.md};
    ${FluidImage} {
      position: absolute;
      height: ${images.icon};
      width: auto;
      margin: auto;
      top: ${spacing.xxs};
      left: 0;
      right: 0;
    }
  }
`;

export const BannerImageContainer = styled(BaseRow)`
  ${BaseIconWrapper} {
    display: none;
  }
  @media (max-width: ${breakpoints.md}) {
    position: relative;
    padding-bottom: ${spacing.xl};
    flex-direction: row-reverse;
    width: ${containerWidth.fluid};
    justify-content: space-between;
    ${BaseIconWrapper} {
      display: block;
      width: ${iconSize.xs};
      height: ${iconSize.xs};
      > svg {
        width: ${iconSize.xs};
        height: ${iconSize.xs};
      }
    }
  }
`;

export const BannerWrapper = styled(BaseRow)`
  @media (max-width: ${breakpoints.md}) {
    align-items: flex-end;
  }
`;

export const BannerButtonContainer = styled(BaseRow)`
  @media (max-width: ${breakpoints.md}) {
    gap: ${spacing.sm};
    ${SecondaryButtonBase} {
      width: ${buttonSize.fluid};
      padding: ${buttonSize.xxl};
    }
    ${TertiaryButtonBase} {
      width: ${buttonSize.fluid};
      padding: ${buttonSize.xxl};
    }
  }
`;
