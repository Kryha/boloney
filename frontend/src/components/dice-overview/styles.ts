import styled from "@emotion/styled";

import { GeneralText } from "../atoms/text";
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
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 31.25vw;
  height: 60px;
  background: transparent;
  border-right: 1px solid ${color.black};
  border-top: 1px solid ${color.black};
  border-bottom: 1px solid ${color.black};
  ${GeneralText} {
    margin-left: 20px;
  }
`;

export const YourDiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: -22px;
  margin-left: 20px;
`;
