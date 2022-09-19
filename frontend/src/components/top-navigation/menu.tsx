import { FC, useState } from "react";
import { text } from "../../assets";
import { ExitButton, InfoButton, MenuButton } from "../buttons";
import { ChildrenContainer, MenuContainer, MenuWrapper } from "./styles";

interface MenuDropdownProps {
  setHover?: (hover: boolean) => void;
}

export const MenuDropdown: FC<MenuDropdownProps> = ({ setHover }) => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);

  return (
    <MenuWrapper>
      <MenuContainer
        onClick={() => setToggleMenu(!toggleMenu)}
        onMouseEnter={() => setHover && setHover(true)}
        onMouseLeave={() => setHover && setHover(false)}
      >
        <MenuButton text={text.general.menu} isOpen={toggleMenu} />
      </MenuContainer>
      <ChildrenContainer isHidden={toggleMenu}>
        {/* TODO: add onclick */}
        <InfoButton text={text.general.info} />
        <ExitButton text={text.general.exit} />
      </ChildrenContainer>
    </MenuWrapper>
  );
};
