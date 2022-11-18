import styled from "@emotion/styled";
import { color, margins } from "../../design";
import { Row } from "../atoms";

export const MatchInfoOverview = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${margins.small2} ${margins.small5};
  background: ${color.lightGrey};
`;

export const MatchInfoHeader = styled(Row)`
  gap: 6px;
`;

export const MatchInfoDescription = styled(Row)`
  gap: 5px;
`;
