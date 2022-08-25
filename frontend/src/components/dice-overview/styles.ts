import styled from "@emotion/styled";

import { GeneralText } from "../atoms/text";
import { color, margins } from "../../design";

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
  gap: ${margins.small1};
  width: 31.25vw;
  height: 9.375vh;
  background: transparent;
  border-right: 1px solid ${color.black};
  border-top: 1px solid ${color.black};
  border-bottom: 1px solid ${color.black};
  ${GeneralText} {
    margin-left: ${margins.medium0};
  }
`;

export const YourDiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${margins.small1};
  margin-top: -22px;
  margin-left: ${margins.medium0};
`;
