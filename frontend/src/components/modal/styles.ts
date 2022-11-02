import styled from "@emotion/styled";
import { CloseIcon } from "../../assets";
import { color } from "../../design";
import { Overlay } from "../atoms";
import { OverlayWrapperSection } from "../overlay-wrapper/styles";
import { TopNavigationSection } from "../top-navigation/styles";

export const Close = styled(CloseIcon)``;

export const CloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 26px 16px 30px;
  gap: 8px;
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

  background: ${color.lightGrey};
  box-shadow: 0px 2px 19px rgba(0, 0, 0, 0.28);
  border-radius: 10px;
`;

export const ModalWrapper = styled.section`
  ${TopNavigationSection} {
    z-index: 1;
  }
`;
