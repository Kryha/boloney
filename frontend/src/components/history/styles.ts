import styled from "@emotion/styled";
import { CloseIcon } from "../../assets/icons";
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
  border: 1px solid ${color.darkGrey};
  display: ${({ isToggled }) => (!isToggled && "none")};
`;

export const Close = styled(CloseIcon)``;

export const HistoryHeadingSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 0px;
  gap: 8px;
  cursor: pointer;
  width: -webkit-fill-available;
`;
