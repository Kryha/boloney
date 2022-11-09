import { FC, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { text } from "../../assets";

import { useStore } from "../../store";
import { GeneralText } from "../atoms/text";
import { Modal } from "../modal";
import { Close, CloseButton, CloseWrapper } from "../modal/styles";
import { OverlayWrapperSection } from "./styles";

export const OverlayWrapper: FC = () => {
  const ref = useRef(null);
  const setIsOverlayVisible = useStore((state) => state.setIsOverlayVisible);
  const setIsModalVisible = useStore((state) => state.setIsModalVisible);
  const setIsContainerVisible = useStore((state) => state.setIsContainerVisible);
  const setIsButtonVisible = useStore((state) => state.setIsButtonVisible);
  const modalComponent = useStore((state) => state.modalComponent);
  const isContainerVisible = useStore((state) => state.isContainerVisible);
  const isButtonVisible = useStore((state) => state.isButtonVisible);

  useOnClickOutside(ref, () => {
    setIsOverlayVisible(false);
    setIsModalVisible(false);
    handleClose();
  });

  const handleClose = () => {
    setIsOverlayVisible(false);
    setIsModalVisible(false);
    setIsButtonVisible(false);
    setIsContainerVisible(false);
  };

  return (
    <OverlayWrapperSection ref={ref}>
      {isButtonVisible && (
        <CloseWrapper>
          <CloseButton onClick={() => handleClose()}>
            <GeneralText>{text.general.close}</GeneralText>
            <Close />
          </CloseButton>
        </CloseWrapper>
      )}
      <Modal hasCloseButton={isButtonVisible} hasContainer={isContainerVisible}>
        {modalComponent}
      </Modal>
    </OverlayWrapperSection>
  );
};
