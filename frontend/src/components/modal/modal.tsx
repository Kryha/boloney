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

  const handleClose = () => {
    setIsOverlayVisible(false);
    setIsModalVisible(false);
  };
  return (
    <ModalWrapper>
      <OverlayWrapper handleClickOutside={() => handleClose()}>
        {hasCloseButton && (
          <CloseWrapper>
            <CloseButton onClick={() => handleClose()}>
              <GeneralText>{text.general.close}</GeneralText>
              <Close />
            </CloseButton>
          </CloseWrapper>
        )}
        <ChildrenWrapper hasContainer={hasContainer}>{children}</ChildrenWrapper>
      </OverlayWrapper>
    </ModalWrapper>
  );
};
