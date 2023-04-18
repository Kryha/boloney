import styled from "@emotion/styled";
import { color, margins, zIndex } from "../../design";
import { SausageSection } from "../spinner/styles";
import { TopNavigationSection } from "../top-navigation/styles";

interface ChildrenWrapperProps {
  hasContainer: boolean;
}

export const ChildrenWrapper = styled.div<ChildrenWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: ${margins.small4};
  box-shadow: ${({ hasContainer }) => (hasContainer ? "0px 2px 19px rgba(0, 0, 0, 0.28)" : "none")};
  border-radius: 10px;
  background: ${({ hasContainer }) => (hasContainer ? color.cloudWhite : color.transparent)};
  width: clamp(920px, 87.5vw + 80px, 1760px);
  height: 85.6vh;
  position: fixed;
  z-index: ${zIndex.overlay};
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
`;

interface ModalProps {
  isModalVisible: boolean;
}

export const ModalWrapper = styled.section<ModalProps>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: ${zIndex.onTop};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ isModalVisible }) => (isModalVisible ? "block" : "none")};
  overflow: scroll;
  ${TopNavigationSection} {
    z-index: ${zIndex.background};
  }
  ${SausageSection} {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const CloseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
