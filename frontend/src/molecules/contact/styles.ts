import styled from "@emotion/styled";
import { BaseColumn, BodyText, fadeUp, Heading1, Heading3, LinkText } from "../../atoms";
import {
  breakpoints,
  containerHeight,
  containerImageHeight,
  containerImageWidth,
  containerWidth,
  fontSizes,
  layoutHeight,
  lineHeights,
  mobileHeight,
  mobileWidth,
  opacity,
  spacing,
  zIndex,
} from "../../design";
import { PrimaryButtonWrapper } from "../../molecules";
import { FooterWrapper } from "../footer";

export const LinkWrapper = styled.div`
  padding-left: clamp(2.5rem, calc(1.85rem + 2vw), 7.88rem);
  ${LinkText} {
    width: fit-content;
  }
  @media (max-width: ${breakpoints.md}) {
    padding-left: clamp(2.5rem, calc(2.9rem + 3.3vw), 7.88rem);
  }
`;

export const ContentWrapper = styled(BaseColumn)`
  ${Heading1} {
    padding: ${spacing.md};
  }
  ${Heading3} {
    padding-top: ${spacing.sm};
    padding-left: ${spacing.md};
  }
  ${BodyText} {
    padding-left: ${spacing.md};
    padding-top: ${spacing.sm};
    padding-bottom: 0px;
  }
  ${PrimaryButtonWrapper} {
    padding-top: ${spacing.sm};
    margin-bottom: ${spacing.md};
  }

  @media (max-width: ${breakpoints.md}) {
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
  }
  @media (max-width: ${breakpoints.xs}) {
    ${Heading1} {
      margin-top: ${spacing.md};
      font-size: ${fontSizes.heading1.xs};
      line-height: ${lineHeights.heading1.xs};
    }
  }
`;

export const ContactImage = styled.img`
  object-fit: contain;
  right: -${containerWidth.md};
  bottom: -${containerHeight.md};
  pointer-events: none;
  opacity: ${opacity.hidden};
  animation: ${fadeUp} 1.2s ease-out 0.25s forwards;
  transform: translate3d(0, 1rem, 0);
  height: ${layoutHeight.md};
  bottom: ${containerImageHeight.xs};

  @media (min-width: ${breakpoints.xxs}) {
    width: ${containerWidth.xxl};
    height: auto;
    left: ${mobileWidth.xs};
    align-self: center;
  }
  @media (min-width: ${breakpoints.md}) {
    position: absolute;
    width: ${containerImageWidth.xxxl};
    left: ${mobileHeight.xxs};
    height: ${containerImageHeight.md};
  }
  @media (min-height: ${breakpoints.sm}) {
    height: ${containerImageHeight.lg};
    bottom: ${containerImageHeight.sm};
  }
  @media (min-width: ${breakpoints.lg}) {
    width: ${containerImageWidth.xxxl};
    bottom: ${containerImageHeight.xs};
  }
  @media (min-height: ${breakpoints.lg}) and (min-width: ${breakpoints.lg}) {
    bottom: ${containerImageHeight.md};
  }
  @media (min-height: ${breakpoints.lg}) and (min-width: ${breakpoints.xl}) {
    bottom: ${containerImageHeight.sm};
  }
  @media (min-height: ${breakpoints.lg}) {
    bottom: ${containerImageHeight.md};
  }
  @media (min-height: ${breakpoints.xl}) {
    bottom: ${containerImageHeight.xl};
    height: ${containerImageHeight.sm};
  }
`;

export const ContactWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;

  ${FooterWrapper} {
    padding-top: ${spacing.lg};

    @media (max-width: ${breakpoints.md}) {
      margin-top: ${spacing.md};
    }
    @media (max-width: ${breakpoints.xs}) {
      padding-left: clamp(2.5rem, calc(2.9rem + 3.3vw), 7.88rem);
    }
  }
`;

export const NavigationContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
