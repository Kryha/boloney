import { FC, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { useStore } from "../../store";
import { OverlayContent } from "./overlay-content";
import { OverlayTransparent, OverlayContainer, BaseRow } from "../../atoms";
import { Modal } from "../../molecules";

export const OverlayWrapper: FC = () => {
  const ref = useRef(null);
  const closeModal = useStore((state) => state.closeModal);
  const modalComponentChildren = useStore((state) => state.modalComponentChildren);
  const isContainerVisible = useStore((state) => state.isContainerVisible);
  const powerUpIds = useStore((state) => state.powerUpIds);
  const matchSettings = useStore((state) => state.matchSettings);

  useOnClickOutside(ref, () => {
    handleClose();
  });
  const handleClose = () => {
    closeModal();
  };

  return (
    <OverlayContainer>
      <OverlayTransparent />
      <BaseRow ref={ref} alignItems="flex-start" justifyContent="flex-end">
        <Modal
          component={<OverlayContent componentType={modalComponentChildren} powerUpIds={powerUpIds} matchSettings={matchSettings} />}
          isContained={isContainerVisible}
          isVisible={!!modalComponentChildren}
          onClose={handleClose}
        />
      </BaseRow>
    </OverlayContainer>
  );
};
