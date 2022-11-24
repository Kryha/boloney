import { FC, ReactNode } from "react";

import { ChildrenWrapper, Close, CloseButton, CloseWrapper, ModalWrapper } from "./styles";
import { useStore } from "../../store";
import { text } from "../../assets";
import { GeneralText } from "../atoms";

interface ModalProps {
  children: ReactNode;
  hasContainer?: boolean;
  isModalButtonVisible?: boolean;
}

export const Modal: FC<ModalProps> = ({ hasContainer = true, children, isModalButtonVisible }) => {
  const isModalVisible = useStore((state) => state.isModalVisible);
  const closeModal = useStore((state) => state.closeModal);
  // TODO: listen to modal store

  return (
    <ModalWrapper isModalVisible={isModalVisible}>
      {isModalButtonVisible && (
        <CloseWrapper>
          <CloseButton onClick={() => closeModal()}>
            <GeneralText>{text.general.close}</GeneralText>
            <Close />
          </CloseButton>
        </CloseWrapper>
      )}
      <ChildrenWrapper hasContainer={hasContainer}>{children}</ChildrenWrapper>
    </ModalWrapper>
  );
};
