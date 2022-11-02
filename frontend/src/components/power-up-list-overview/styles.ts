import styled from "@emotion/styled";

import { color } from "../../design";

export const PowerUpWrapper = styled.div`
  box-sizing: border-box;
  width: clamp(29.99px, 3.26vw + -1.27px, 61.25px);
  height: clamp(45.28px, 4.91vw + -1.89px, 92.45px);
  background: ${color.white};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1), 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
`;

export const PowerUpCardImage = styled.img`
  // TODO:change depending on assets
  height: 100%;
  width: auto;
  margin-left: -15px;
`;
