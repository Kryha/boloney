import styled from "@emotion/styled";

import { color } from "../../design";

export const PowerUpWrapper = styled.div`
  box-sizing: border-box;
  width: 45.28px;
  height: 67.92px;
  background: ${color.white};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const PowerUpCardImage = styled.img`
  // TODO:change depending on assets
  height: 100%;
  width: auto;
  margin-left: -15px;
`;
