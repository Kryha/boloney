import { FC } from "react";
import { GeneralRow } from "../../atoms";

import { Rules } from "../rules";
import { Sound } from "../sound";
import { TopNavigationWrapper } from "./styles";
import { Menu } from "../menu";
import { ActiveDropdown } from "./top-navigation";

interface Props {
  isAuthenticated?: boolean;
  activeDropdown: ActiveDropdown;
  isDropdownContentVisible: boolean;

  setActiveDropdown: (dropdown: ActiveDropdown) => void;
  onAuth: () => void;
  onClickRules: () => void;
  onClickOutsideDropdown: (ref: React.RefObject<HTMLElement>, isOpen: boolean) => void;
  currentVolume: number;
  onVolumeChange: (volumeLevel: number) => void;
  onClickContact: () => void;
}

/**
 *
 * This is the match navigation component, its is a navigation menu.
 * @param {boolean} isAuthenticated - If we are authenticated.
 * @param {ActiveDropdown} activeDropdown - This is used to keep track of what dropdown item is in use.
 * @param {boolean} isDropdownContentVisible - If set to false, it forces all the dropdowns to be hidden.
 * @param {Function} setActiveDropdown - This is function used to set the dropdown item that is now open.
 * @param {Function} onAuth - A function to handle Authentication.
 * @param {Function} onClickContact - A function to handle viewing contact page.
 * @param {handleRules} onClickRules - A function to handle viewing the rules.
 * @param {Function} onClickOutsideDropdown - A function to handle closing the dropdown when clicking outside of it.
 * @param {number} currentVolume - The current volume level.
 * @param {Function} onVolumeChange - A function to handle changing the volume.
 */

export const MatchNavigation: FC<Props> = ({
  isAuthenticated,
  activeDropdown,
  isDropdownContentVisible,
  setActiveDropdown,
  onAuth,
  onClickRules,
  onClickOutsideDropdown,
  onVolumeChange,
  onClickContact,
  currentVolume,
}) => {
  return (
    <TopNavigationWrapper>
      <GeneralRow>
        <Sound
          onClickOutsideDropdown={onClickOutsideDropdown}
          isOpen={activeDropdown === "sound" && isDropdownContentVisible}
          expand={() => setActiveDropdown("sound")}
          currentVolume={currentVolume}
          onChange={onVolumeChange}
        />
        <Rules
          onClickOutsideDropdown={onClickOutsideDropdown}
          isOpen={activeDropdown === "rules" && isDropdownContentVisible}
          expand={() => setActiveDropdown("rules")}
          onClick={onClickRules}
        />
        <Menu
          onClickOutsideDropdown={onClickOutsideDropdown}
          isOpen={activeDropdown === "menu" && isDropdownContentVisible}
          expand={() => setActiveDropdown("menu")}
          onAuthClick={onAuth}
          onClickContact={onClickContact}
          isAuthenticated={isAuthenticated}
        />
      </GeneralRow>
    </TopNavigationWrapper>
  );
};
