import styled from "@emotion/styled";
import { BaseRow, BodyText, Box } from "../../atoms";

import { color, spacing } from "../../design";

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

export const CheckboxContainer = styled(Box)<CheckboxContainerProps>`
  margin-right: -${spacing.xxs};
  border-top: ${({ isTop }) => (isTop ? `1px solid ${color.mediumGrey}` : "none")};
`;

export const PercentageInputContainer = styled.div``;

export const InputIconContainer = styled.div`
  margin: ${spacing.xxs} ${spacing.ms} 0px ${spacing.ms};
`;

export const FormContentWrapper = styled.div`
  margin-left: ${spacing.md};
  ${BodyText} {
    margin: ${spacing.xs} 0px ${spacing.md} 0px;
    width: clamp(400px, 34.72vw + 66.67px, 1400px);
  }
`;
