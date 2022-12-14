import styled from "@emotion/styled";

import { color, margins } from "../../design";

export const PowerUpWrapper = styled.div`
  box-sizing: border-box;
  width: clamp(30px, 1.56vw + 15px, 45px);
  height: clamp(40px, 2.08vw + 20px, 60px);
  background: ${color.white};
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
