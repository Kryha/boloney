import styled from "@emotion/styled";
import { color, zIndex } from "../../design";
import { PowerUpCardWrapper } from "../power-up-card/styles";

export const PowerUpPileContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  gap: 30px;
  margin-top: 30px;
  ${PowerUpCardWrapper} {
    width: clamp(171px, 17.5vw + 3px, 339px);
    height: 42.87vh;
    min-height: 330px;
    z-index: ${zIndex.inFront};
  }
`;

export const EmptyPowerUpCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: clamp(171px, 17.5vw + 3px, 339px);
  height: 42.87vh;
  min-height: 330px;
  background: ${color.white};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transform: rotate(5deg);
  z-index: ${zIndex.behind};
`;

export const PowerUpSpreadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 30px;
  margin-top: 30px;
`;
