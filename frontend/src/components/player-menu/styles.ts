import styled from "@emotion/styled";

import { PlusIcon } from "../../assets/icons";
import { color, margins } from "../../design";

export const PlayerMenuWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  position: absolute;
  bottom: 0;
  left: 75vw;
`;

export const PlayerMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 25vw;
  background: transparent;
`;

export const MenuSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${margins.small1};
  width: 25vw;
  height: 7.198vh;
  background: transparent;
  border-left: 1px solid ${color.darkGrey};
  border-right: 1px solid ${color.darkGrey};
`;

interface LayoutProps {
  isToggled: boolean;
}

export const ChatSection = styled(MenuSection) <LayoutProps>`
  height: 5.105vh;
  cursor: pointer;
  display: ${({ isToggled }) => (isToggled && "none")};
`;

export const HistorySection = styled(MenuSection) <LayoutProps>`
  height: 5.105vh;
  cursor: pointer;
  display: ${({ isToggled }) => (isToggled && "none")};
  border-top: 1px solid ${color.darkGrey};
  border-bottom: 1px solid ${color.darkGrey};
`;

export const Plus = styled(PlusIcon)``;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px ${margins.small2};
  width: 100%;
  align-items: center;
`;
