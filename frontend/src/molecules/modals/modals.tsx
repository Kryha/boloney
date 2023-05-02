import { FC, ReactNode } from "react";

import { CloseIconSVG, text } from "../../assets";
import { ModalBlock, ModalWrapper, ModalOverlay, ModalButtonWrapper, BaseIcon } from "../../atoms";
import { TertiaryButton } from "../buttons";
import { ModalContainer } from "./styles";

interface Props {
  component: ReactNode;
  isContained?: boolean;
  isVisible: boolean;
  onClose?: () => void;
}

/**
 * @param {ReactNode} component - Component is what information you would like to be displayed in the modal
 * @param {boolean} isContained - This is used to indicate whether the modal has a container whereby the information is displayed.
 * @param {boolean} isVisible - This is to indicate if the modal is visible within the screen or not.
 * @param {Function} onClose - When provided with this prop, there will be a button available to close the modal.
 */

export const Modal: FC<Props> = ({ component, isContained = false, onClose, isVisible }) => {
  return (
    <ModalContainer isVisible={isVisible}>
      <ModalOverlay />
      <ModalWrapper>
        {!!onClose && (
          <ModalButtonWrapper>
            <TertiaryButton text={text.general.close} onClick={onClose} icon={<BaseIcon src={<CloseIconSVG />} cursor />} />
          </ModalButtonWrapper>
        )}
        <ModalBlock isContained={isContained}>{component}</ModalBlock>
      </ModalWrapper>
    </ModalContainer>
  );
};
