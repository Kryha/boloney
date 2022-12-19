import styled from "@emotion/styled";
import { CloseIcon } from "../../assets/icons";
import { color, margins } from "../../design";

interface LayoutProps {
  isMenuOpen: boolean;
  isToggled: boolean;
  isInMatch: boolean;
  isChat: boolean;
}

export const MenuToggleSection = styled.section<LayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${margins.small1};
  height: ${({ isMenuOpen }): string => (isMenuOpen ? "47.25vh" : "89vh")};
  width: 25vw;
  border-top: ${({ isChat }): string => (isChat ? "none" : `1px solid ${color.mediumGrey}`)};
  border-bottom: ${({ isMenuOpen, isChat }): string => (isMenuOpen && isChat ? "none" : `1px solid ${color.mediumGrey}`)};
  border-left: ${({ isInMatch }) => (isInMatch ? `1px solid ${color.mediumGrey}` : "none")};
  display: ${({ isToggled }) => !isToggled && "none"};
`;

export const Close = styled(CloseIcon)``;

export const MenuToggleHeadingSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${margins.small4} ${margins.small4} 0px;
  gap: ${margins.small1};
  cursor: pointer;
  width: -webkit-fill-available;
`;

export const MenuChildrenContainer = styled.div``;
