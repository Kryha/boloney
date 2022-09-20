import { FC } from "react";

import { text, SettingsIcon, LogoutIcon, ExitIcon } from "../../assets";
import { DropdownButton } from "../buttons";
import { Ellipsis } from "../buttons/styles";
import { Dropdown } from "./dropdown";
import { ActiveDropdown } from "./top-navigation";

interface MenuDropdownProps {
  setHover?: (hover: boolean) => void;
  isActive: boolean;
  setActiveDropdown: (dropdown: ActiveDropdown) => void;
}

export const MenuDropdown: FC<MenuDropdownProps> = ({ setHover, isActive, setActiveDropdown }) => {
  return (
    <Dropdown
      setHover={setHover}
      isActive={isActive}
      expand={() => setActiveDropdown("menu")}
      buttonText={text.general.menu}
      buttonIcon={<Ellipsis />}
    >
      <DropdownButton text={text.general.settings} icon={<SettingsIcon />} />
      <DropdownButton text={text.general.logout} icon={<LogoutIcon />} />
      <DropdownButton text={text.general.exit} icon={<ExitIcon />} />
    </Dropdown>
  );
};
