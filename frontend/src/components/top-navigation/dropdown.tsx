import { FC, ReactNode } from "react";

import { DropdownButton } from "../buttons";
import { ChildrenContainer, ButtonContainer, DropdownWrapper } from "./styles";

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
      <ButtonContainer
        isActive={isActive}
        onClick={() => expand()}
        onMouseEnter={() => setHover && setHover(true)}
        onMouseLeave={() => setHover && setHover(false)}
      >
        <DropdownButton primaryText={buttonText} isOpen={isActive} icon={buttonIcon} />
      </ButtonContainer>
      <ChildrenContainer isHidden={!isActive}>{children}</ChildrenContainer>
    </DropdownWrapper>
  );
};
