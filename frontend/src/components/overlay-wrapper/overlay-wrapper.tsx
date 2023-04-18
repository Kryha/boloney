import { FC, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { useStore } from "../../store";
import { OverlayContent } from "./overlay-content";
import { Modal } from "../modal";
import { OverlayWrapperSection } from "./styles";
import { OverlayTransparent, OverlayContainer } from "../../atoms";

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
    <OverlayContainer>
      <OverlayTransparent />
      <OverlayWrapperSection ref={ref}>
        <Modal hasContainer={isContainerVisible} isModalButtonVisible={isModalButtonVisible}>
          <OverlayContent name={modalComponentChildren} />
        </Modal>
      </OverlayWrapperSection>
    </OverlayContainer>
  );
};
