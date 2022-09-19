import { FC, ReactNode } from "react";

import { DropdownButton } from "../buttons";
import { ChildrenContainer, DropdownContainer, DropdownWrapper } from "./styles";

interface Props {
  children: ReactNode;
  isActive: boolean;

  buttonIcon: ReactNode;
  buttonText: string;

  expand: () => void;
  setHover?: (hover: boolean) => void;
}

export const Dropdown: FC<Props> = ({ setHover, isActive, expand, children, buttonText, buttonIcon }) => {
  return (
    <DropdownWrapper>
      <DropdownContainer
        onClick={() => expand()}
        onMouseEnter={() => setHover && setHover(true)}
        onMouseLeave={() => setHover && setHover(false)}
      >
        <DropdownButton text={buttonText} isOpen={!isActive} icon={buttonIcon} />
      </DropdownContainer>
      <ChildrenContainer isHidden={!isActive}>{children}</ChildrenContainer>
    </DropdownWrapper>
  );
};
