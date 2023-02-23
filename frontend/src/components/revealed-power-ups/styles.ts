import styled from "@emotion/styled";
import { color, zIndex } from "../../design";
import { PowerUpCardImage, PowerUpWrapper } from "../power-up/styles";

export const RevealedPowerUpsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  gap: 4px;
  margin-bottom: 4px;
  z-index: ${zIndex.onTop};
  ${PowerUpWrapper} {
    width: clamp(18px, 1.25vw + 6px, 30px);
    height: clamp(23px, 1.25vw + 11px, 35px);
  }
  ${PowerUpCardImage} {
    width: clamp(30px, 1.56vw + 15px, 45px);
  }
`;

export const PowerUpContainer = styled.div`
  box-sizing: border-box;
  background: ${color.white};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  width: clamp(18px, 1.25vw + 6px, 30px);
  height: clamp(23px, 1.25vw + 11px, 35px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  cursor: pointer;
`;
