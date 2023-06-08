import styled from "@emotion/styled";
import { BaseBlock, BaseRow, BodyText } from "../../atoms";

import { color, containerWidth, MATCH_FORM_MARGIN, POWER_UP_FORM_SIZE, spacing } from "../../design";

export const CheckWrapper = styled.div`
  padding: 0px ${spacing.sm} ${spacing.md} ${spacing.sm};
  user-select: none;
  cursor: pointer;
`;

export const DescriptionContainer = styled.div`
  flex: 11;
  padding: 0px 0px ${spacing.xs} ${spacing.xs};
`;

export const CheckboxWrapper = styled(BaseRow)`
  padding-top: ${spacing.sm};
`;

interface CheckboxContainerProps {
  isTop?: boolean;
  isChecked?: boolean;
}

export const CheckboxContainer = styled(BaseBlock)<CheckboxContainerProps>`
  width: ${containerWidth.xxl};
  margin-left: -${MATCH_FORM_MARGIN};
  border-top: ${({ isTop }) => (isTop ? `1px solid ${color.mediumGrey}` : "0px")};
  background: ${({ isChecked }) => (isChecked ? color.cloudWhite : color.transparent)};
  border-radius: 0px;
  box-shadow: none;
  cursor: pointer;
`;

export const PercentageInputContainer = styled.div``;

export const InputIconContainer = styled.div`
  margin: ${spacing.xxs} ${spacing.ms} 0px ${spacing.ms};
`;

export const FormContentWrapper = styled.div`
  margin-left: ${spacing.sm};
  ${BodyText} {
    margin: ${spacing.xs} 0px ${spacing.sm} 0px;
    width: ${POWER_UP_FORM_SIZE};
  }
`;
