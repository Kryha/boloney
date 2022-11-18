import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { text, SettingsIcon, LogoutIcon, ExitIcon } from "../../assets";
import { routes } from "../../navigation";
import { useAuth } from "../../service";
import { useStore } from "../../store";
import { HorizontalDivider } from "../atoms";
import { DropdownButton } from "../buttons";
import { Ellipsis } from "../buttons/styles";
import { MatchSettingsOverview } from "../match-settings-overview";
import { Dropdown } from "./dropdown";
import { MenuContainer } from "./styles";
import { ActiveDropdown } from "./top-navigation";

interface MenuDropdownProps {
  setHover?: (hover: boolean) => void;
  isActive: boolean;
  setActiveDropdown: (dropdown: ActiveDropdown) => void;
}

export const MenuDropdown: FC<MenuDropdownProps> = ({ setHover, isActive, setActiveDropdown }) => {
  const { isAuthenticated, logout } = useAuth();
  const toggleModalWithContainer = useStore((state) => state.toggleModalWithContainer);
  const setModalComponentChildren = useStore((state) => state.setModalComponentChildren);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setActiveDropdown(undefined);
    navigate(routes.root);
  };

  const openMatchSettings = () => {
    toggleModalWithContainer();
    setModalComponentChildren(<MatchSettingsOverview />);
  };

  return (
    <Dropdown
      setHover={setHover}
      isActive={isActive}
      expand={() => setActiveDropdown("menu")}
      buttonText={text.general.menu}
      buttonIcon={<Ellipsis />}
    >
      <MenuContainer>
        <DropdownButton text={text.general.matchSettings} icon={<SettingsIcon />} onClick={() => openMatchSettings()} />
        {isAuthenticated && (
          <>
            <HorizontalDivider />
            <DropdownButton onClick={() => handleLogout()} text={text.general.logout} icon={<LogoutIcon />} />
          </>
        )}
        <HorizontalDivider />
        <DropdownButton text={text.general.leaveMatch} icon={<ExitIcon />} />
      </MenuContainer>
    </Dropdown>
  );
};
