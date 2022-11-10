import { FC, ReactNode } from "react";

import { ChildrenWrapper, ModalWrapper } from "./styles";
import { useStore } from "../../store";

interface ModalProps {
  children: ReactNode;
  hasContainer?: boolean;
}

export const Modal: FC<ModalProps> = ({ hasContainer = true, children }) => {
  const isModalVisible = useStore((state) => state.isModalVisible);
  // TODO: listen to modal store
  return (
    <ModalWrapper isModalVisible={isModalVisible}>
      <ChildrenWrapper hasContainer={hasContainer}>{children}</ChildrenWrapper>
    </ModalWrapper>
  );
};
