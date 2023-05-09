import { FC } from "react";
import { ContactIconSVG, text } from "../../assets";
import { BaseIcon, GeneralRow } from "../../atoms";
import { color } from "../../design";
import { Dropdown } from "../dropdown";
import { Menu } from "../menu";
import { Rules } from "../rules";
import { TopNavigationWrapper } from "./styles";

export type ActiveDropdown = "rules" | "menu" | "contact" | undefined;

interface Props {
  isInMatch?: boolean;
  isAuthenticated?: boolean;
  activeDropdown: ActiveDropdown;
  isDropdownContentVisible: boolean;
  setActiveDropdown: (dropdown: ActiveDropdown) => void;
  handleAuth: () => void;
  handleSettings: () => void;
  handleLeaveMatch: () => void;
}

/**
 *
 * This is the top navigation component, its is a navigation menu.
 * @param {boolean} isInMatch - If we are currently in a match.
 * @param {boolean} isAuthenticated - If we are authenticated.
 * @param {ActiveDropdown} activeDropdown - This is used to keep track of what dropdown item is in use.
 * @param {boolean} isDropdownContentVisible - If set to false, it forces all the dropdowns to be hidden.
 * @param {Function} setActiveDropdown - This is function used to set the dropdown item that is now open.
 * @param {Function} handleAuth - A function to handle Authentication.
 * @param {Function} handleSettings - A function to handle viewing the match settings.
 * @param {Function} handleLeaveMatch - A function to handle leaving the match.
 */

// TODO: redesign component
export const TopNavigation: FC<Props> = ({
  isInMatch,
  isAuthenticated,
  activeDropdown,
  isDropdownContentVisible,
  setActiveDropdown,
  handleLeaveMatch,
  handleAuth,
  handleSettings,
}) => {
  return (
    <TopNavigationWrapper>
      <GeneralRow>
        <Rules isOpen={activeDropdown === "rules" && isDropdownContentVisible} expand={() => setActiveDropdown("rules")} />
        <Dropdown
          isOpen={activeDropdown === "contact" && isDropdownContentVisible}
          buttonIcon={<BaseIcon src={<ContactIconSVG />} iconColor={color.transparent} strokeColor={color.black} cursor />}
          buttonText={text.general.contact}
          expand={() => setActiveDropdown("contact")}
        />
        {/* TODO: add sound, only in match situations */}
        <Menu
          isOpen={activeDropdown === "menu" && isDropdownContentVisible}
          expand={() => setActiveDropdown("menu")}
          handleSettings={handleSettings}
          handleAuth={handleAuth}
          handleLeaveMatch={handleLeaveMatch}
          isInMatch={isInMatch}
          isAuthenticated={isAuthenticated}
        />
      </GeneralRow>
    </TopNavigationWrapper>
  );
};
