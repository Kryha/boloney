import { FC } from "react";

import { text } from "../../assets";
import { ExitButton, InfoButton } from "../buttons";
import { Dropdown } from "./dropdown";
import { ActiveDropdown } from "./top-navigation";

interface MenuDropdownProps {
  setHover?: (hover: boolean) => void;
  isActive: boolean;
  setActiveDropdown: (dropdown: ActiveDropdown) => void;
}

export const MenuDropdown: FC<MenuDropdownProps> = ({ setHover, isActive, setActiveDropdown }) => {
  return (
    <Dropdown setHover={setHover} isActive={isActive} expand={() => setActiveDropdown("menu")} buttonText={text.general.menu}>
      {/* TODO: add onclick */}
      <InfoButton text={text.general.info} />
      <ExitButton text={text.general.exit} />
    </Dropdown>
  );
};
