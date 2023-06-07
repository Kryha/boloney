import { FC } from "react";
import { ContactIconSVG, LogoutIconSVG, SettingsIconSVG, text } from "../../assets";
import { BaseIcon, GeneralRow } from "../../atoms";
import { color } from "../../design";
import { Dropdown } from "../dropdown";
import { Rules } from "../rules";
import { Sound } from "../sound";
import { TopNavigationWrapper } from "./styles";

export type ActiveDropdown = "rules" | "menu" | "contact" | "sound" | "options" | undefined;

interface Props {
  isInMatch?: boolean;
  isAuthenticated?: boolean;
  activeDropdown: ActiveDropdown;
  isDropdownContentVisible: boolean;

  setActiveDropdown: (dropdown: ActiveDropdown) => void;
  onAuthClick: () => void;
  onSettingsClick: () => void;
  onLeaveMatchClick: () => void;
  onClickRules: () => void;
  onClickContact: () => void;
  onClickOutsideDropdown: (ref: React.RefObject<HTMLElement>, isOpen: boolean) => void;
  currentVolume: number;
  handleVolumeChange: (volumeLevel: number) => void;
}

/**
 *
 * @description This is the top navigation component, its is a navigation menu.
 * @param {boolean} isInMatch - If we are currently in a match.
 * @param {boolean} isAuthenticated - If we are authenticated.
 * @param {ActiveDropdown} activeDropdown - This is used to keep track of what dropdown item is in use.
 * @param {boolean} isDropdownContentVisible - If set to false, it forces all the dropdowns to be hidden.
 * @param {Function} setActiveDropdown - This is function used to set the dropdown item that is now open.
 * @param {Function} onAuthClick - A function to handle Authentication.
 * @param {Function} onSettingsClick - A function to handle viewing the match settings.
 * @param {Function} onLeaveMatchClick - A function to handle leaving the match.
 * @param {handleRules} onClickRules - A function to handle viewing the rules.
 * @param {handleContact} onClickContact - A function to handle viewing the contact page.
 * @param {Function} onClickOutsideDropdown - A function to handle closing the dropdown when clicking outside of it.
 * @param {number} currentVolume - The current volume level.
 * @param {Function} handleVolumeChange - A function to handle changing the volume.
 */

export const TopNavigation: FC<Props> = ({
  isAuthenticated,
  activeDropdown,
  isDropdownContentVisible,
  setActiveDropdown,
  onAuthClick,
  onClickRules,
  onClickContact,
  onClickOutsideDropdown,
  handleVolumeChange,
  currentVolume,
}) => {
  const authIcon = isAuthenticated ? <LogoutIconSVG /> : <SettingsIconSVG />;
  const authText = isAuthenticated ? text.general.logout : text.general.login;
  return (
    <TopNavigationWrapper>
      <GeneralRow>
        <Sound
          onClickOutsideDropdown={onClickOutsideDropdown}
          isOpen={activeDropdown === "sound" && isDropdownContentVisible}
          expand={() => setActiveDropdown("sound")}
          currentVolume={currentVolume}
          onChange={handleVolumeChange}
        />
        <Rules
          onClickOutsideDropdown={onClickOutsideDropdown}
          isOpen={activeDropdown === "rules" && isDropdownContentVisible}
          expand={() => setActiveDropdown("rules")}
          onClick={onClickRules}
        />
        <Dropdown
          useOnClickOutside={onClickOutsideDropdown}
          isOpen={activeDropdown === "contact" && isDropdownContentVisible}
          buttonIcon={<BaseIcon src={<ContactIconSVG />} iconColor={color.transparent} strokeColor={color.black} pointer />}
          buttonText={text.general.contact}
          expand={onClickContact}
        />
        <Dropdown
          useOnClickOutside={onClickOutsideDropdown}
          isOpen={activeDropdown === "menu" && isDropdownContentVisible}
          buttonText={authText}
          buttonIcon={<BaseIcon src={authIcon} pointer />}
          expand={onAuthClick}
        />
      </GeneralRow>
    </TopNavigationWrapper>
  );
};
