import styled from "@emotion/styled";
import { fadeUp, Heading1, Heading4, Heading5 } from "../../atoms";
import { breakpoints, mobileHeight, mobileWidth, opacity, spacing, zIndex } from "../../design";
import { PrimaryButtonWrapper } from "../../molecules";
import { GeneralLinkContainer, GeneralLinkWrapper } from "../links/styles";

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${Heading1} {
    padding: ${spacing.md};
  }
  ${Heading4} {
    padding-top: ${spacing.sm};
    padding-left: ${spacing.md};
  }
  ${Heading5} {
    padding-left: ${spacing.xxl};
    padding-top: ${spacing.sm};
    padding-bottom: 0px;
  }
  ${PrimaryButtonWrapper} {
    padding-top: ${spacing.sm};
  }
  ${GeneralLinkWrapper} {
    padding-left: ${spacing.xxl};
    padding-bottom: ${spacing.lg};
    padding-top: 0px;
    gap: 0px;
  }
  ${GeneralLinkContainer} {
    gap: 0px;
  }

  @media (max-width: ${breakpoints.md}) {
    overflow-y: auto;
  }
`;

export const ButtonWrapper = styled.div`
  margin-bottom: ${spacing.md};
`;

export const ContactImage = styled.img`
  object-fit: contain;
  right: -100px;
  bottom: -100px;
  pointer-events: none;
  opacity: ${opacity.hidden};

  z-index: ${zIndex.background};
  animation: ${fadeUp} 1.2s ease-out 0.25s forwards;
  transform: translate3d(0, 1rem, 0);

  @media (min-width: ${breakpoints.xs}) {
    width: 75vw;
    height: auto;
    left: ${mobileWidth.xs};
    bottom: ${mobileHeight.md};
  }
  @media (min-width: ${breakpoints.md}) {
    position: absolute;
    width: 170vw;
    height: 30vh;
    left: ${mobileHeight.xxs};
    bottom: 38vh;
  }
  @media (min-width: ${breakpoints.xl}) {
    bottom: 30vh;
    height: 40vh;
  }
  @media (min-width: 2200px) {
    bottom: 45vh;
  }
`;

export const ContactWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
`;

export const NavigationContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
