import { FC } from "react";
import { MatchStats } from "../match-stats";
import { ActiveDropdown, TopNavigation } from "../top-navigation";
import { NavigationWrapper } from "./styles";

interface Props {
  isInMatch?: boolean;
  isAuthenticated?: boolean;
  activeDropdown: ActiveDropdown;
  isDropdownContentVisible: boolean;
  totalDice: number;
  stageNumber: number;
  drawNumber: number;
  currentVolume: number;
  handleVolumeChange: (volumeLevel: number) => void;
  setActiveDropdown: (dropdown: ActiveDropdown) => void;
  handleAuth: () => void;
  handleSettings: () => void;
  handleLeaveMatch: () => void;
  handleRules: () => void;
}

/**
 *
 * This is the navigation bar component, its is a navigation menu with the match stats.
 * @param {boolean} isInMatch - If we are currently in a match.
 * @param {boolean} isAuthenticated - If we are authenticated.
 * @param {ActiveDropdown} activeDropdown - This is used to keep track of what dropdown item is in use.
 * @param {boolean} isDropdownContentVisible - If set to false, it forces all the dropdowns to be hidden.
 * @param {Function} setActiveDropdown - This is function used to set the dropdown item that is now open.
 * @param {Function} handleAuth - A function to handle Authentication.
 * @param {Function} handleSettings - A function to handle viewing the match settings.
 * @param {Function} handleLeaveMatch - A function to handle leaving the match.
 * @param {Function} onClick - A function whose use is to open up the power-up modal.
 * @param {number} totalDice - The total amount of dice in the match.
 * @param {number} stageNumber - Divides the current number of dice in play
 * @param {number} drawNumber - How often a Power-up draw round occurs
 */

export const NavigationBar: FC<Props> = ({
  isInMatch,
  isAuthenticated,
  activeDropdown,
  isDropdownContentVisible,
  totalDice,
  stageNumber,
  drawNumber,
  currentVolume,
  handleVolumeChange,
  setActiveDropdown,
  handleLeaveMatch,
  handleAuth,
  handleSettings,
  handleRules,
}) => {
  return (
    <NavigationWrapper>
      <MatchStats totalDice={totalDice} stageNumber={stageNumber} drawNumber={drawNumber} />
      <TopNavigation
        isInMatch={isInMatch}
        setActiveDropdown={setActiveDropdown}
        isDropdownContentVisible={isDropdownContentVisible}
        activeDropdown={activeDropdown}
        handleAuth={handleAuth}
        handleLeaveMatch={handleLeaveMatch}
        handleSettings={handleSettings}
        handleRules={handleRules}
        currentVolume={currentVolume}
        handleVolumeChange={handleVolumeChange}
        isAuthenticated={isAuthenticated}
      />
    </NavigationWrapper>
  );
};
