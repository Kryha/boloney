import { FC } from "react";

import { CloseIconSVG, EllipsisIconSVG, ExitIconSVG, LogoutIconSVG, RaisedHandIconSVG, SettingsIconSVG, text } from "../../assets";
import { BaseIcon, IconImage } from "../../atoms";
import { Dropdown } from "../dropdown";
import { MenuButton } from "./menu-button";
import { MenuWrapper } from "./styles";

interface Props {
  isOpen: boolean;
  isInMatch?: boolean;
  isAuthenticated?: boolean;

  handleAuth: () => void;
  onClickSettings: () => void;
  handleLeaveMatch: () => void;
  expand: () => void;
  onClickOutsideDropdown: (ref: React.RefObject<HTMLElement>, isOpen: boolean) => void;
}

/**
 *
 * This is the menu component, its is displayed in the navigation menu.
 * @param {boolean} isOpen - If the Menu is open.
 * @param {boolean} isInMatch - If we are currently in a match.
 * @param {boolean} isAuthenticated - If we are authenticated.
 * @param {Function} handleAuth - A function to handle Authentication.
 * @param {Function} onClickSettings - A function to handle viewing the match settings.
 * @param {Function} handleLeaveMatch - A function to handle leaving the match.
 * @param {Function} expand - A function whose use is to define what happens when you click on the menu.
 * @param {Function} onClickOutsideDropdown - A function to handle closing the dropdown when clicking outside of it.
 */

export const Menu: FC<Props> = ({
  isOpen,
  isInMatch = false,
  isAuthenticated,
  handleAuth,
  onClickSettings,
  handleLeaveMatch,
  expand,
  onClickOutsideDropdown,
}) => {
  const menuIcon = isOpen ? <CloseIconSVG /> : <EllipsisIconSVG />;
  const authIcon = isAuthenticated ? <LogoutIconSVG /> : <SettingsIconSVG />;
  const authText = isAuthenticated ? text.general.logout : text.general.login;

  return (
    <Dropdown
      useOnClickOutside={onClickOutsideDropdown}
      isOpen={isOpen}
      buttonText={text.general.menu}
      buttonIcon={<BaseIcon src={menuIcon} pointer padding="1px" />}
      expand={expand}
    >
      <MenuWrapper>
        {isInMatch && (
          <MenuButton
            buttonText={text.general.matchSettings}
            buttonIcon={<IconImage src={RaisedHandIconSVG} pointer />}
            hasDivider
            expand={() => onClickSettings()}
          />
        )}
        <MenuButton
          buttonText={authText}
          buttonIcon={<BaseIcon src={authIcon} pointer />}
          hasDivider={!isInMatch}
          expand={() => handleAuth()}
        />
        {isInMatch && (
          <MenuButton
            buttonText={text.general.leaveMatch}
            buttonIcon={<BaseIcon src={<ExitIconSVG />} pointer />}
            expand={() => handleLeaveMatch()}
          />
        )}
      </MenuWrapper>
    </Dropdown>
  );
};
