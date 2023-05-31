import styled from "@emotion/styled";
import { spacing } from "../../design";
import { BaseIcon, BaseRow } from "../../atoms";

export const LogoContainer = styled(BaseRow)`
  margin: ${spacing.sm} ${spacing.xs};
  cursor: pointer;
`;

export const TextLogoIcon = styled(BaseIcon)`
  margin: 0px ${spacing.sm} 0px ${spacing.sm};
`;
