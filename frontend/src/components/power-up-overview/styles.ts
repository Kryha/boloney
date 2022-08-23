import styled from "styled-components";

import { color } from "../../design";

export const PowerUpWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  bottom: 0;
  left: 43.75vw;
`;

export const PowerUpContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;

  width: 31.25vw;
  height: 60px;
  background: transparent;
  border-right: 1px solid ${color.black};
  border-left: 1px solid ${color.black};
  border-top: 1px solid ${color.black};
  border-bottom: 1px solid ${color.black};
`;
