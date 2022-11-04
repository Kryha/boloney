import styled from "@emotion/styled";
import { CloseIcon } from "../../assets";
import { color } from "../../design";
import { TopNavigationSection } from "../top-navigation/styles";

export const Close = styled(CloseIcon)``;

export const CloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 26px 20px 30px;
  gap: 8px;
  background: ${color.lightGrey};
  z-index: 11;
  cursor: pointer;
`;

export const CloseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

interface ChildrenWrapperProps {
  hasContainer: boolean;
}

export const ChildrenWrapper = styled.div<ChildrenWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;

  box-shadow: ${({ hasContainer }) => (hasContainer ? "0px 2px 19px rgba(0, 0, 0, 0.28)" : "none")};
  border-radius: 10px;
  background: ${({ hasContainer }) => (hasContainer ? `${color.white}` : "transparent")};
  width: clamp(920px, 87.5vw + 80px, 1760px);
  height: 85.6vh;
  position: fixed;
  z-index: 5;
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
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ isModalVisible }) => !isModalVisible && "none"};

  ${TopNavigationSection} {
    z-index: 1;
  }
`;
