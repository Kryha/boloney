import styled from "@emotion/styled";

import { PlusIcon } from "../../assets/icons";
import { color, margins, zIndex } from "../../design";

export const PlayerMenuWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 75vw;
  z-index: ${zIndex.background};
`;

export const PlayerMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 25vw;
  background: transparent;
`;

interface LayoutProps {
  isToggled?: boolean;
  isInMatch: boolean;
}

export const MenuSection = styled.section<LayoutProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${margins.small2};
  width: 25vw;
  height: 7.198vh;
  background: transparent;
  border-right: 1px solid ${color.mediumGrey};
`;

export const ChatSection = styled(MenuSection)<LayoutProps>`
  height: 5.5vh;
  cursor: pointer;
  display: ${({ isToggled }) => isToggled && "none"};
  border-left: ${({ isInMatch }) => (isInMatch ? `1px solid ${color.mediumGrey}` : "none")};
`;

export const HistorySection = styled(MenuSection)<LayoutProps>`
  height: 5.5vh;
  cursor: pointer;
  display: ${({ isToggled }) => isToggled && "none"};
  border-top: 1px solid ${color.mediumGrey};
  border-bottom: 1px solid ${color.mediumGrey};
  border-left: ${({ isInMatch }) => (isInMatch ? `1px solid ${color.mediumGrey}` : "none")};
`;

export const Plus = styled(PlusIcon)``;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px ${margins.small4};
  width: 100%;
  align-items: center;
`;
