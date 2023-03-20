import styled from "@emotion/styled";

import { LightningIcon } from "../../assets";
import { color, margins } from "../../design";
import { Row, GeneralText } from "../atoms";

interface IconProps {
  customColor?: string;
}

export const Lightning = styled(LightningIcon)<IconProps>`
  width: auto;
  height: 1em;
  margin-top: 3px;
  path {
    stroke: ${({ customColor }): string => customColor || color.darkGrey};
  }
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
