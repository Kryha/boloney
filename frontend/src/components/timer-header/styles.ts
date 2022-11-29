import styled from "@emotion/styled";
import { margins } from "../../design";
import { Heading6, Row, VerticalDivider } from "../atoms";

export const TimerRow = styled(Row)`
  gap: ${margins.small4};
  margin-bottom: ${margins.small4};
  ${Heading6} {
    text-transform: uppercase;
  }
`;

export const Divider = styled(VerticalDivider)`
  height: 24px;
`;
