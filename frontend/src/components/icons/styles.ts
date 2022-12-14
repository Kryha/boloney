import styled from "@emotion/styled";

import { LightningIcon } from "../../assets";
import { color, margins } from "../../design";
import { GeneralText, Row } from "../atoms";

export const Lightning = styled(LightningIcon)`
  width: auto;
  height: 1em;
  margin-top: 3px;
  path {
    stroke: ${color.darkGrey};
  }
`;

export const PowerUpIconWrapper = styled(Row)`
  align-items: center;
  padding: 0px;
  gap: 0.1em;

  ${GeneralText} {
    :first-letter {
      text-transform: none;
    }
  }
`;

export const DiceIconWrapper = styled(Row)`
  align-items: center;
  padding: 0px;
  gap: ${margins.small0};

  ${GeneralText} {
    :first-letter {
      text-transform: none;
    }
  }
`;
