import styled from "@emotion/styled";

import { color, zIndex } from "../../design";

interface PowerUpWrapperProps {
  isInHud?: boolean;
}

export const PowerUpWrapper = styled.div<PowerUpWrapperProps>`
  box-sizing: border-box;
  width: ${({ isInHud }) => (isInHud ? "clamp(30px, 2.22vw + 15px, 67px)" : "clamp(30px, 1.56vw + 15px, 45px)")};
  height: ${({ isInHud }) => (isInHud ? "clamp(40px, 2.98vw + 20px, 90px)" : "clamp(40px, 2.08vw + 20px, 60px)")};
  background: ${color.cloudGrey};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
`;

interface PowerUpProps {
  isSmokeAndMirrors: boolean;
  isDoubleUp: boolean;
}

export const PowerUpCardImage = styled.img<PowerUpProps>`
  height: auto;
  width: ${({ isSmokeAndMirrors }): string =>
    isSmokeAndMirrors ? "clamp(65px, 2.08vw + 45px, 85px)" : " clamp(45px, 2.08vw + 25px, 65px)"};
  margin-right: ${({ isDoubleUp }): string => (isDoubleUp ? "-0.8vw" : "0px")};
`;

export const DisabledPowerUpsIconWrapper = styled.div`
  position: relative;
  height: clamp(18px, 2.08vw + -2px, 38px);
  bottom: 10px;
  z-index: ${zIndex.onTop};
  > svg {
    width: clamp(18px, 2.08vw + -2px, 28px);
    height: clamp(18px, 2.08vw + -2px, 28px);
    border-radius: clamp(2px, 0.1vw + 1px, 3px);
  }
`;

export const PowerUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
