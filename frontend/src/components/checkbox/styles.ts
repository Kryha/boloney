import styled from "@emotion/styled";

import { color, margins } from "../../design";
import { GeneralContentWrapper, Row } from "../../atoms";
import { PowerUpWrapper } from "../power-up/styles";

export const LightningIconContainer = styled.div`
  margin-top: 3px;
`;

export const CheckWrapper = styled.div`
  padding: ${margins.small5} ${margins.small5} ${margins.large0} ${margins.small5};
  user-select: none;
  cursor: pointer;
`;

export const DescriptionContainer = styled.div`
  flex: 11;

  padding: ${margins.small2} 0px ${margins.small2} ${margins.small2};
  ${GeneralContentWrapper} {
    margin-left: ${margins.small3};
    margin-top: ${margins.small0};
  }
`;

interface CheckboxContainerProps {
  isTop?: boolean;
  isChecked?: boolean;
}

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  display: flex;
  width: 62.5vw;
  margin-right: -3px;
  cursor: pointer;
  border-top: ${({ isTop }) => (isTop ? `1px solid ${color.mediumGrey}` : "0px")};
  background: ${({ isChecked }) => (isChecked ? color.cloudWhite : color.transparent)};
  :hover {
    background: ${color.cloudWhite};
  }
  ${PowerUpWrapper} {
    margin-top: ${margins.small5};
    margin-bottom: ${margins.small3};
  }
  ${Row} {
    gap: ${margins.small0};
  }
`;

export const PercentageInputContainer = styled.div``;

export const InputIconContainer = styled.div`
  margin-top: ${margins.small6};
  margin-right: ${margins.small6};
  margin-left: ${margins.small6};
`;
