import styled from "@emotion/styled";
import { BaseColumn } from "../../atoms";

import { containerWidth, spacing } from "../../design";

export const MatchSelectWrapper = styled.section`
  margin-top: ${spacing.xxl};
  margin-left: ${spacing.md};
`;

export const MatchSelectContainer = styled(BaseColumn)`
  margin-top: ${spacing.md};
  margin-left: 1px;
  width: ${containerWidth.xxl};
`;
