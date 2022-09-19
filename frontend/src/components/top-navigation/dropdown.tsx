import { FC, ReactNode } from "react";

import { MenuButton } from "../buttons";
import { ChildrenContainer, MenuContainer, MenuWrapper } from "./styles";

interface Props {
  children: ReactNode;
  isActive: boolean;
  buttonText: string;
  expand: () => void;
  setHover?: (hover: boolean) => void;
}

export const Dropdown: FC<Props> = ({ setHover, isActive, expand, children, buttonText }) => {
  return (
    <MenuWrapper>
      <MenuContainer
        onClick={() => expand()}
        onMouseEnter={() => setHover && setHover(true)}
        onMouseLeave={() => setHover && setHover(false)}
      >
        <MenuButton text={buttonText} isOpen={!isActive} />
      </MenuContainer>
      <ChildrenContainer isHidden={!isActive}>{children}</ChildrenContainer>
    </MenuWrapper>
  );
};
