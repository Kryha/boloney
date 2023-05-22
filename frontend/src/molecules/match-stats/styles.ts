import styled from "@emotion/styled";
import { BaseRow } from "../../atoms";
import { buttonSize, color } from "../../design";

export const MatchStatsWrapper = styled(BaseRow)`
  background: ${color.grey};
  padding: ${buttonSize.md};
  width: fit-content;
`;
