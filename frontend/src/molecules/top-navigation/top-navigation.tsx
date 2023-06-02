import { FC } from "react";
import { ContactIconSVG, text } from "../../assets";
import { BaseIcon, GeneralRow } from "../../atoms";
import { color } from "../../design";
import { Dropdown } from "../dropdown";
import { Menu } from "../menu";
import { Rules } from "../rules";
import { Sound } from "../sound";
import { TopNavigationWrapper } from "./styles";

export type ActiveDropdown = "rules" | "menu" | "contact" | "sound" | undefined;

interface Props {
  isInMatch?: boolean;
  isAuthenticated?: boolean;
  activeDropdown: ActiveDropdown;
  isDropdownContentVisible: boolean;

  setActiveDropdown: (dropdown: ActiveDropdown) => void;
  handleAuth: () => void;
  onClickSettings: () => void;
  handleLeaveMatch: () => void;
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
 * @param {Function} handleAuth - A function to handle Authentication.
 * @param {Function} onClickSettings - A function to handle viewing the match settings.
 * @param {Function} handleLeaveMatch - A function to handle leaving the match.
 * @param {handleRules} onClickRules - A function to handle viewing the rules.
 * @param {handleContact} onClickContact - A function to handle viewing the contact page.
 * @param {Function} onClickOutsideDropdown - A function to handle closing the dropdown when clicking outside of it.
 * @param {number} currentVolume - The current volume level.
 * @param {Function} handleVolumeChange - A function to handle changing the volume.
 */

export const TopNavigation: FC<Props> = ({
  isInMatch,
  isAuthenticated,
  activeDropdown,
  isDropdownContentVisible,
  setActiveDropdown,
  handleLeaveMatch,
  handleAuth,
  onClickSettings,
  onClickRules,
  onClickContact,
  onClickOutsideDropdown,
  handleVolumeChange,
  currentVolume,
}) => {
  return (
    <TopNavigationWrapper>
      <GeneralRow>
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
        <Sound
          onClickOutsideDropdown={onClickOutsideDropdown}
          isOpen={activeDropdown === "sound" && isDropdownContentVisible}
          expand={() => setActiveDropdown("sound")}
          currentVolume={currentVolume}
          onChange={handleVolumeChange}
        />
        <Menu
          onClickOutsideDropdown={onClickOutsideDropdown}
          isOpen={activeDropdown === "menu" && isDropdownContentVisible}
          expand={() => setActiveDropdown("menu")}
          onClickSettings={onClickSettings}
          handleAuth={handleAuth}
          handleLeaveMatch={handleLeaveMatch}
          isInMatch={isInMatch}
          isAuthenticated={isAuthenticated}
        />
      </GeneralRow>
    </TopNavigationWrapper>
  );
};
