import styled from "@emotion/styled";
import { color, shadows, zIndex } from "../../design";
import { GeneralText } from "../atoms";

// TODO: implement Atoms for cookie banner
export const CloseIconWrapper = styled.div`
  margin-top: 4px;
`;

export const CookieBannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 44.24vw;
  height: 20vh;
  background-color: ${color.cloudWhite};
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
  width: clamp(30px, 2.43vw + 6.67px, 100px);
  height: clamp(30px, 2.43vw + 6.67px, 100px);
`;

export const CookieBannerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: space-around;
  flex-wrap: nowrap;
  gap: 10px;
`;
