import styled from "styled-components";

import { color } from "../../design";

export const DieOverviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  bottom: 0;
  left: 12.5vw;
`;

export const DieOverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;

  width: 31.25vw;
  height: 60px;
  background: transparent;
  border-right: 1px solid ${color.black};
  border-top: 1px solid ${color.black};
  border-bottom: 1px solid ${color.black};
`;

export const YourDiceContainer = styled.div`
  position: absolute;
  top: -20px;
  left: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
