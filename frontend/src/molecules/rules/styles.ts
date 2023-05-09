import styled from "@emotion/styled";

import { Heading6, InformationBlock } from "../../atoms";
import { spacing } from "../../design";

export const RulesWrapper = styled(InformationBlock)`
  position: absolute;
  right: 0;
  overflow-y: scroll;
`;

export const RulesTitle = styled(Heading6)`
  margin-bottom: ${spacing.xs};
`;
