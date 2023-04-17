import { FC, ReactNode } from "react";

import { ChildrenWrapper, CloseWrapper, ModalWrapper } from "./styles";
import { useStore } from "../../store";
import { CloseIconSVG, text } from "../../assets";
import { BaseIcon } from "../atoms";
import { TertiaryButton } from "../../molecules";

interface ModalProps {
  children: ReactNode;
  hasContainer?: boolean;
  isModalButtonVisible?: boolean;
}

export const Modal: FC<ModalProps> = ({ hasContainer = true, children, isModalButtonVisible }) => {
  const isModalVisible = useStore((state) => state.isModalVisible);
  const closeModal = useStore((state) => state.closeModal);
  const action = useStore((state) => state.action);
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  // TODO: listen to modal store

  const close = () => {
    closeModal();
    if (action === "powerUp") {
      setTurnActionStep("pickAction");
    }
  };

  return (
    <ModalWrapper isModalVisible={isModalVisible}>
      {isModalButtonVisible && (
        <CloseWrapper>
          <TertiaryButton text={text.general.close} icon={<BaseIcon src={<CloseIconSVG />} />} onClick={() => close()} />
        </CloseWrapper>
      )}
      <ChildrenWrapper hasContainer={hasContainer}>{children}</ChildrenWrapper>
    </ModalWrapper>
  );
};
