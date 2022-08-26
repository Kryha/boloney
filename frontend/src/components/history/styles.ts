import styled from "@emotion/styled";
import { color, margins } from "../../design";
import { Heading4 } from "../atoms";

interface LayoutProps {
  isChatToggled: boolean;
}

export const HistorySection = styled.section <LayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${margins.small0};
  height: ${({ isChatToggled }): string => (isChatToggled ? "47vh;" : "81.9vh;")};
  width: 25vw;
  border-bottom: 1px solid ${color.black};
  border-left: 1px solid ${color.black};
  border-top: 1px solid ${color.black};
  ${Heading4} {
    margin-left: ${margins.small2};
  }
`;
