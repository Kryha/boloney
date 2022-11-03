import styled from "@emotion/styled";
import { color, margins } from "../../design";

export const PlayerOverview = styled.section`
  border-top: 1px solid ${color.darkGrey};
  width: 75vw;
  height: 11vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
`;

export const CurrentPlayer = styled.div`
  width: 12.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${margins.small2};
`;
