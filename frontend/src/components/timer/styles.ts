import styled from "@emotion/styled";
import { margins } from "../../design";
import { Row, VerticalDivider } from "../atoms";

export const TimerRow = styled(Row)`
  gap: ${margins.small4};
  margin-bottom: ${margins.small4};
`;

export const Divider = styled(VerticalDivider)`
  height: 24px;
`;
