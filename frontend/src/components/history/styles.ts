import styled from "@emotion/styled";
import { color, margins } from "../../design";
import { Heading4 } from "../atoms";

interface LayoutProps {
  isChatToggled: boolean;
  isToggled: boolean;
}

export const HistorySection = styled.section<LayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${margins.small0};
  height: ${({ isChatToggled }): string => (isChatToggled ? "47vh" : "81.9vh")};
  width: 25vw;
  border: 1px solid ${color.black};
  border-right: none;
  ${Heading4} {
    margin-left: ${margins.small2};
    cursor: pointer;
  }
  display: ${({ isToggled }) => (!isToggled && "none")};
`;
