import styled from "@emotion/styled";
import { breakpoints, buttonSize, color, iconSize, shadows, spacing, zIndex } from "../../design";
import { BaseIconWrapper, BaseRow, BodyText, Heading6, SecondaryButtonBase, TertiaryButtonBase } from "../../atoms";

// TODO: implement Atoms for cookie banner

export const CookieBannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 44.24vw;
  height: fit-content;
  background-color: ${color.cloudWhite};
  position: absolute;
  left: 30vw;
  top: 2.5vh;
  z-index: ${zIndex.cookieBanner};
  box-shadow: ${shadows.s};
  border-radius: 10px;
  padding: 20px;
  ${BaseIconWrapper} {
    position: absolute;
    right: 20px;
  }
  @media (max-width: ${breakpoints.md}) {
    width: 80vw;
    max-height: 72.5vh;
    padding: ${spacing.md} ${spacing.md} ${spacing.s} ${spacing.md};
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    justify-content: normal;
    gap: ${spacing.xl};
    ${BaseIconWrapper} {
      width: ${iconSize.xs};
      height: ${iconSize.xs};
      top: 20px;
      > svg {
        width: ${iconSize.xs};
        height: ${iconSize.xs};
      }
    }
  }
`;

export const CookieBannerContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  justify-content: space-between;
  position: absolute;
`;

export const CookieBannerText = styled(BaseRow)`
  width: 80%;
  flex-direction: column;
  margin-left: clamp(30px, 2.43vw + 6.67px, 100px);
  padding-left: ${spacing.s};

  ${BodyText} {
    padding-top: ${spacing.xs};
  }
  @media (max-width: ${breakpoints.md}) {
    width: 100%;
    margin-left: 0px;
    padding-left: 0px;
    margin-top: 7vh;
    ${Heading6} {
      margin-top: ${spacing.xl};
    }
    ${BodyText} {
      padding-top: 15px;
    }
  }
`;

export const CookieImage = styled.img`
  width: clamp(30px, 2.43vw + 6.67px, 100px);
  height: clamp(30px, 2.43vw + 6.67px, 100px);
  position: absolute;
  @media (max-width: ${breakpoints.md}) {
    height: 7vh;
    width: auto;
    margin: auto;
    top: ${spacing.md};
    left: 0;
    right: 0;
  }
`;

export const CookieBannerButtons = styled(BaseRow)`
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-content: space-around;
  flex-wrap: nowrap;
  gap: 10px;
  margin-top: ${spacing.ms};

  @media (max-width: ${breakpoints.md}) {
    margin-top: 0px;
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

export const CookieBannerContainer = styled.div`
  @media (max-width: ${breakpoints.md}) {
    height: 100dvh;
    width: 100vw;
    background: rgba(137, 137, 137, 0.7);
    position: fixed;
    z-index: ${zIndex.cookieBanner};
  }
`;
