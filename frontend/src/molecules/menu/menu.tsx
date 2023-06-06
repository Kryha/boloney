import { FC } from "react";

import { CloseIconSVG, ContactIconSVG, EllipsisIconSVG, LogoutIconSVG, SettingsIconSVG, text } from "../../assets";
import { BaseIcon } from "../../atoms";
import { color } from "../../design";
import { Dropdown } from "../dropdown";
import { MenuButton } from "./menu-button";
import { MenuWrapper } from "./styles";

interface Props {
  isOpen: boolean;
  isAuthenticated?: boolean;

  onClickContact: () => void;
  onAuthClick: () => void;
  expand: () => void;
  onClickOutsideDropdown: (ref: React.RefObject<HTMLElement>, isOpen: boolean) => void;
}

/**
 *
 * This is the menu component, it is displayed in the match navigation menu.
 * @param {boolean} isOpen - If the Menu is open.
 * @param {boolean} isAuthenticated - If we are authenticated.
 * @param {Function} onAuthClick - A function to handle Authentication.
 * @param {Function} onClickContact- A function to handle navigating to the contact page.
 * @param {Function} expand - A function whose use is to define what happens when you click on the menu.
 * @param {Function} onClickOutsideDropdown - A function to handle closing the dropdown when clicking outside of it.
 */

export const Menu: FC<Props> = ({ isOpen, isAuthenticated, onAuthClick, expand, onClickOutsideDropdown, onClickContact }) => {
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
        <MenuButton
          expand={onClickContact}
          buttonIcon={<BaseIcon src={<ContactIconSVG />} iconColor={color.transparent} strokeColor={color.black} pointer />}
          buttonText={text.general.contact}
          hasDivider
        />
        <MenuButton buttonText={authText} buttonIcon={<BaseIcon src={authIcon} pointer />} expand={() => onAuthClick()} />
      </MenuWrapper>
    </Dropdown>
  );
};
