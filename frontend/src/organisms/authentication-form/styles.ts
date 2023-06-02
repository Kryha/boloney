import styled from "@emotion/styled";
import { BaseRow } from "../../atoms";

import { InputContainer } from "../../components";
import { containerWidth, spacing } from "../../design";

export const AuthContainer = styled(BaseRow)`
  margin-top: ${spacing.ms};
  width: ${containerWidth.xxl};
  ${InputContainer} {
    margin-top: ${spacing.sm};
  }
`;
