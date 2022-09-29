import { FC, ReactNode, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useUIState } from "../../store/ui";

import { DropdownButton } from "../buttons";
import { ChildrenContainer, ButtonContainer, DropdownWrapper } from "./styles";

interface Props {
  children: ReactNode;
  isActive: boolean;

  buttonIcon: ReactNode;
  buttonText: string;

  expand: () => void;
  setHover?: (hover: boolean) => void;
  setIsVisible: (isVisible: boolean) => void;
}

export const Dropdown: FC<Props> = ({ setHover, isActive, expand, children, buttonText, buttonIcon, setIsVisible }) => {
  const ref = useRef(null);
  const setIsOverlayVisible = useUIState((state) => state.setIsOverlayVisible);

  const handleClickOutside = () => {
    setIsOverlayVisible(false);
    setHover && setHover(false);
    setIsVisible(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <DropdownWrapper ref={ref}>
      <ButtonContainer
        isActive={isActive}
        onClick={() => expand()}
        onMouseEnter={() => setHover && setHover(true)}
        onMouseLeave={() => setHover && setHover(false)}
      >
        <DropdownButton text={buttonText} isOpen={isActive} icon={buttonIcon} />
      </ButtonContainer>
      <ChildrenContainer isHidden={!isActive}>{children}</ChildrenContainer>
    </DropdownWrapper>
  );
};
