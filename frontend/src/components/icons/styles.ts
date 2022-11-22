import styled from "@emotion/styled";

import { LightningIcon } from "../../assets";
import { color, margins } from "../../design";
import { Row } from "../atoms";
import { DieWrapper } from "../die/styles";

export const Lightning = styled(LightningIcon)`
  width: 11px;
  height: 15px;
  path {
    stroke: ${color.darkGrey};
  }
  margin-top: 3px;
`;

export const PowerUpIconWrapper = styled(Row)`
  gap: ${margins.small0};
  align-items: center;
  margin-top: -1px;
`;

export const DiceIconWrapper = styled(Row)`
  gap: ${margins.small0};
  align-items: center;
  ${DieWrapper} {
    margin-top: ${margins.small1};
  }
`;
