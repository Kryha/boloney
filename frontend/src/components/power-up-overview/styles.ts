import styled from "@emotion/styled";

import { color } from "../../design";
import { GeneralText } from "../atoms/text";

export const PowerUpOverviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 43.75vw;
`;

export const PowerUpOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 31.25vw;
  height: 9.375vh;
  background: transparent;
  border-left: 1px solid ${color.black};
  border-top: 1px solid ${color.black};
  border-bottom: 1px solid ${color.black};
  ${GeneralText} {
    margin-left: 20px;
  }
`;

export const YourPowerUpContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: -45px;
  margin-left: 20px;
`;
