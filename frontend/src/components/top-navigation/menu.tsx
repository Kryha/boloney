import { FC } from "react";

import { text, SettingsIcon, LogoutIcon, ExitIcon } from "../../assets";
import { HorizonalDivider } from "../atoms";
import { DropdownButton } from "../buttons";
import { Ellipsis } from "../buttons/styles";
import { Dropdown } from "./dropdown";
import { MenuContainer } from "./styles";
import { ActiveDropdown } from "./top-navigation";

interface MenuDropdownProps {
  setHover?: (hover: boolean) => void;
  isActive: boolean;
  setActiveDropdown: (dropdown: ActiveDropdown) => void;
  setIsVisible: (isVisible: boolean) => void;
}

export const MenuDropdown: FC<MenuDropdownProps> = ({ setHover, isActive, setActiveDropdown, setIsVisible }) => {
  return (
    <Dropdown
      setHover={setHover}
      isActive={isActive}
      expand={() => setActiveDropdown("menu")}
      buttonText={text.general.menu}
      buttonIcon={<Ellipsis />}
      setIsVisible={setIsVisible}
    >
      <MenuContainer>
        <DropdownButton text={text.general.settings} icon={<SettingsIcon />} />
        <HorizonalDivider />
        <DropdownButton text={text.general.logout} icon={<LogoutIcon />} />
        <HorizonalDivider />
        <DropdownButton text={text.general.exit} icon={<ExitIcon />} />
      </MenuContainer>
    </Dropdown>
  );
};
