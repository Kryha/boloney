import styled from "@emotion/styled";
import { color, margins } from "../../design";

interface PlayerOverviewProps {
  isActive: boolean;
}

export const PlayerOverview = styled.section<PlayerOverviewProps>`
  background-color: ${({ isActive }): string => (isActive ? color.lightGrey : "transparent")};
  border-top: 1px solid ${color.darkGrey};
  width: 75vw;
  height: 11vh;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const LocalPlayer = styled.div`
  width: 12.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${margins.small2};
`;
