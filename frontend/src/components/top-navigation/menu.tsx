import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { text, EllipsisIconSVG, ExitIconSVG, SettingsIconSVG, LogoutIconSVG, ContactIconSVG } from "../../assets";
import { buttonSize, color } from "../../design";
import { TertiaryButton } from "../../molecules";
import { routes } from "../../navigation";
import { useLogout, useMatch } from "../../service";
import { useSession, useStore } from "../../store";
import { isNkError, NavigationLocation } from "../../types";
import { BaseIcon, HorizontalDivider } from "../../atoms";
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

  const contact = (
    <TertiaryButton
      onClick={() => navigate(routes.contact)}
      text={text.general.contact}
      icon={<BaseIcon src={<ContactIconSVG />} iconColor={color.transparent} strokeColor={color.black} cursor />}
      active={isActive}
      padding={buttonSize.md}
    />
  );

  if (location === "landing") {
    if (session)
      return (
        <>
          {contact}
          <TertiaryButton
            onClick={() => handleLogout()}
            text={text.general.logout}
            icon={<BaseIcon src={<LogoutIconSVG />} cursor />}
            active={isActive}
            padding={buttonSize.md}
          />
        </>
      );
    return (
      <>
        {contact}
        <TertiaryButton
          text={text.general.login}
          icon={<BaseIcon src={<SettingsIconSVG />} cursor />}
          onClick={() => navigate(routes.login)}
          padding={buttonSize.md}
          backgroundColor={color.lightGrey}
        />
      </>
    );
  }

  return (
    <Dropdown
      setHover={setHover}
      isActive={isActive}
      expand={() => setActiveDropdown("menu")}
      buttonText={text.general.menu}
      buttonIcon={<EllipsisIcon src={<EllipsisIconSVG />} cursor />}
      isInMatch={location === "match"}
    >
      <MenuContainer location={location}>
        {location && location !== "default" && (
          <TertiaryButton
            text={text.general.matchSettings}
            icon={<BaseIcon src={<SettingsIconSVG />} cursor />}
            onClick={() => handleSettings()}
            active={isActive}
            justifyContent="flex-end"
          />
        )}
        {!!session && (
          <>
            <HorizontalDivider />
            <TertiaryButton
              onClick={() => handleLogout()}
              text={text.general.logout}
              icon={<BaseIcon src={<LogoutIconSVG />} cursor />}
              active={isActive}
              width={buttonSize.fluid}
              justifyContent="flex-end"
            />
          </>
        )}
        {location && location !== "default" && (
          <>
            <HorizontalDivider />
            <TertiaryButton
              onClick={() => leaveMatch()}
              text={text.general.leaveMatch}
              icon={<BaseIcon src={<ExitIconSVG />} cursor />}
              active={isActive}
              width={buttonSize.fluid}
              justifyContent="flex-end"
            />
          </>
        )}
        <>
          <HorizontalDivider />
          {contact}
        </>
      </MenuContainer>
    </Dropdown>
  );
};
