import styled from "@emotion/styled";

import { color, zIndex } from "../../design";

interface PowerUpWrapperProps {
  isInHud?: boolean;
}

export const PowerUpWrapper = styled.div<PowerUpWrapperProps>`
  box-sizing: border-box;
  width: ${({ isInHud }) => (isInHud ? "clamp(30px, 4.7vh + 15px, 5.7vh)" : "clamp(30px, 1.56vw + 15px, 45px)")};
  height: ${({ isInHud }) => (isInHud ? "clamp(40px, 6.6vh + 20px, 7.6vh)" : "clamp(40px, 2.08vw + 20px, 60px)")};
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
    isSmokeAndMirrors ? "clamp(65px, 6.11vh + 45px, 7.45vh)" : "clamp(30px, 4.7vh + 15px, 5.7vh)"};
  margin-right: ${({ isDoubleUp }): string => (isDoubleUp ? "-0.8vw" : "0px")};
`;

export const DisabledPowerUpsIconWrapper = styled.div`
  position: absolute;
  bottom: -10px;
  z-index: ${zIndex.onTop};
`;

export const PowerUpContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
