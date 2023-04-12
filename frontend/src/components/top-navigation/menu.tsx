import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { text, EllipsisIconSVG, ExitIconSVG, SettingsIconSVG, LogoutIconSVG } from "../../assets";
import { routes } from "../../navigation";
import { useLogout, useMatch } from "../../service";
import { useSession, useStore } from "../../store";
import { isNkError, NavigationLocation } from "../../types";
import { BaseIcon, HorizontalDivider } from "../atoms";
import { DropdownButton } from "../buttons";
import { Dropdown } from "./dropdown";
import { EllipsisIcon, MenuContainer } from "./styles";
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
    broadcastPlayerLeft();
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
    if (session)
      return (
        <DropdownButton
          onClick={() => handleLogout()}
          primaryText={text.general.logout}
          icon={<BaseIcon src={<LogoutIconSVG />} cursor />}
        />
      );
    return (
      <DropdownButton
        primaryText={text.general.login}
        icon={<BaseIcon src={<SettingsIconSVG />} cursor />}
        onClick={() => navigate(routes.login)}
      />
    );
  }

  return (
    <Dropdown
      setHover={setHover}
      isActive={isActive}
      expand={() => setActiveDropdown("menu")}
      buttonText={text.general.menu}
      buttonIcon={<EllipsisIcon src={<EllipsisIconSVG />} cursor />}
    >
      <MenuContainer location={location}>
        {location && location !== "default" && (
          <DropdownButton
            primaryText={text.general.matchSettings}
            icon={<BaseIcon src={<SettingsIconSVG />} cursor />}
            onClick={() => handleSettings()}
          />
        )}
        {!!session && (
          <>
            <HorizontalDivider />
            <DropdownButton
              onClick={() => handleLogout()}
              primaryText={text.general.logout}
              icon={<BaseIcon src={<LogoutIconSVG />} cursor />}
            />
          </>
        )}
        {location && location !== "default" && (
          <>
            <HorizontalDivider />
            <DropdownButton
              onClick={() => leaveMatch()}
              primaryText={text.general.leaveMatch}
              icon={<BaseIcon src={<ExitIconSVG />} cursor />}
            />
          </>
        )}
      </MenuContainer>
    </Dropdown>
  );
};
