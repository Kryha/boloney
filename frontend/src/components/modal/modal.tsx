import { FC, ReactNode } from "react";

import { ChildrenWrapper, Close, CloseButton, CloseWrapper, ModalWrapper } from "./styles";
import { useStore } from "../../store";
import { OverlayWrapper } from "../overlay-wrapper";
import { GeneralText } from "../atoms";
import { text } from "../../assets";

interface ModalProps {
  children: ReactNode;
  hasContainer?: boolean;
  hasCloseButton?: boolean;
}

export const Modal: FC<ModalProps> = ({ hasContainer = true, children, hasCloseButton }) => {
  const setIsModalVisible = useStore((state) => state.setIsModalVisible);
  const setIsOverlayVisible = useStore((state) => state.setIsOverlayVisible);
  const isModalVisible = useStore((state) => state.isModalVisible);

  const handleClose = () => {
    setIsOverlayVisible(false);
    setIsModalVisible(false);
  };
  return (
    <ModalWrapper isModalVisible={isModalVisible}>
      <ChildrenWrapper hasContainer={hasContainer}>{children}</ChildrenWrapper>
    </ModalWrapper>
  );
};
