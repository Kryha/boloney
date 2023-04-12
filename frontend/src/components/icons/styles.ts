import styled from "@emotion/styled";

import { margins } from "../../design";
import { Row, GeneralText, BaseIconWrapper } from "../atoms";

export const LightningIcon = styled(BaseIconWrapper)`
  margin-top: 3px;
`;

export const PowerUpIconWrapper = styled(Row)`
  align-items: center;
  padding: 0px;
  gap: 0.1em;
`;

export const DiceIconWrapper = styled(Row)`
  align-items: center;
  padding: 0px;
  gap: ${margins.small0};
`;

export const ExtraDiceInfo = styled(GeneralText)`
  mark {
    margin-left: 2px;
  }
`;

export const ExtraInfoSum = styled(GeneralText)`
  mark {
    margin-left: 4px;
  }
`;
