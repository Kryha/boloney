import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { text, SettingsIcon, LogoutIcon, ExitIcon } from "../../assets";
import { routes } from "../../navigation";
import { useLogout, useMatch } from "../../service";
import { useSession, useStore } from "../../store";
import { isNkError, NavigationLocation } from "../../types";
import { HorizontalDivider } from "../atoms";
import { DropdownButton } from "../buttons";
import { Ellipsis } from "../buttons/styles";
import { Dropdown } from "./dropdown";
import { MenuContainer } from "./styles";
import { ActiveDropdown } from "./top-navigation";

interface MenuDropdownProps {
  setHover?: (hover: boolean) => void;
  isActive: boolean;
  location?: NavigationLocation;
  setActiveDropdown: (dropdown: ActiveDropdown) => void;
}

export const MenuDropdown: FC<MenuDropdownProps> = ({ setHover, isActive, setActiveDropdown, location = "default" }) => {
  const navigate = useNavigate();
  const session = useSession();

  const logout = useLogout();
  const setModalWithContainer = useStore((state) => state.setModalWithContainer);
  const setModalComponentChildren = useStore((state) => state.setModalComponentChildren);
  const { broadcastPlayerLeft } = useMatch();

  const handleLogout = () => {
    logout();
    setActiveDropdown(undefined);
    navigate(routes.root);
  };

  const handleSettings = () => {
    setModalWithContainer(true);
    setModalComponentChildren("match-settings-overview");
  };

  const leaveMatch = async () => {
    const res = await broadcastPlayerLeft();
    if (isNkError(res)) {
      // TODO: show error to user
      console.warn(res);
    } else {
      navigate(routes.home);
    }
  };

  if (location === "landing") {
    if (session) return <DropdownButton onClick={() => handleLogout()} primaryText={text.general.logout} icon={<LogoutIcon />} />;
    return <DropdownButton primaryText={text.general.login} icon={<SettingsIcon />} onClick={() => navigate(routes.login)} />;
  }

  return (
    <Dropdown
      setHover={setHover}
      isActive={isActive}
      expand={() => setActiveDropdown("menu")}
      buttonText={text.general.menu}
      buttonIcon={<Ellipsis />}
    >
      <MenuContainer location={location}>
        {location && location !== "default" && (
          <DropdownButton primaryText={text.general.matchSettings} icon={<SettingsIcon />} onClick={() => handleSettings()} />
        )}
        {!!session && (
          <>
            <HorizontalDivider />
            <DropdownButton onClick={() => handleLogout()} primaryText={text.general.logout} icon={<LogoutIcon />} />
          </>
        )}
        {location && location !== "default" && (
          <>
            <HorizontalDivider />
            <DropdownButton onClick={() => leaveMatch()} primaryText={text.general.leaveMatch} icon={<ExitIcon />} />
          </>
        )}
      </MenuContainer>
    </Dropdown>
  );
};
