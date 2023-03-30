import styled from "@emotion/styled";
import { color, shadows, zIndex } from "../../design";
import { GeneralText, SecondaryButtonBase } from "../atoms";
import { TertiaryButton } from "../buttons";
import { CloseButton, TertiaryButtonContainer } from "../buttons/styles";

export const CookieBannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 44.24vw;
  height: 20vh;
  background-color: ${color.cloudGrey};
  position: absolute;
  left: 30vw;
  top: 2.5vh;
  z-index: ${zIndex.onTop};
  box-shadow: ${shadows.s};
  border-radius: 10px;
  padding: 20px;
`;

export const CookieBannerContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 7vh;
  ${CloseButton} {
    cursor: pointer;
  }
`;

export const CookieBannerText = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  ${GeneralText} {
    padding-top: 15px;
  }
`;

export const CookieImage = styled.img`
  width: 50px;
  height: 50px;
`;

export const CookieAcceptButton = styled(TertiaryButton)`
  ${TertiaryButtonContainer} {
    border: 1px solid ${color.black};
    width: 150px;
  }
`;

export const CookieBannerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: space-around;
  flex-wrap: nowrap;
  gap: 10px;
  ${SecondaryButtonBase} {
    width: 150px;
  }
`;
