import { FC, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { text } from "../../assets";

import { useStore } from "../../store";
import { GeneralText } from "../atoms/text";
import { Modal } from "../modal";
import { Close, CloseButton, CloseWrapper, OverlayWrapperSection } from "./styles";

export const OverlayWrapper: FC = () => {
  const ref = useRef(null);
  const closeModal = useStore((state) => state.closeModal);
  const modalComponentChildren = useStore((state) => state.modalComponentChildren);
  const isContainerVisible = useStore((state) => state.isContainerVisible);
  const isModalButtonVisible = useStore((state) => state.isModalButtonVisible);

  useOnClickOutside(ref, () => {
    handleClose();
  });

  const handleClose = () => {
    closeModal();
  };

  return (
    <OverlayWrapperSection ref={ref}>
      {isModalButtonVisible && (
        <CloseWrapper>
          <CloseButton onClick={() => handleClose()}>
            <GeneralText>{text.general.close}</GeneralText>
            <Close />
          </CloseButton>
        </CloseWrapper>
      )}
      <Modal hasContainer={isContainerVisible}>{modalComponentChildren}</Modal>
    </OverlayWrapperSection>
  );
};
