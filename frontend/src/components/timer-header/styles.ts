import styled from "@emotion/styled";
import { margins } from "../../design";
import { Row, VerticalDivider } from "../atoms";

export const TimerRow = styled(Row)`
  gap: ${margins.small4};
  padding-top: ${margins.medium0};
`;

export const Divider = styled(VerticalDivider)`
  height: 24px;
`;
