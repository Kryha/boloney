import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { useIsMobile } from "../../hooks";
import { ActiveDropdown, MatchStats, TopNavigation } from "../../molecules";
import { routes } from "../../navigation";
import { useLogout, useMatch } from "../../service";
import { useStore } from "../../store";
import { isNkError } from "../../types";
import { NavigationWrapper } from "./styles";

interface Props {
  isInMatch?: boolean;
  isAuthenticated?: boolean;
  activeDropdown: ActiveDropdown;
  isDropdownContentVisible: boolean;
  totalDice: number;
  stageNumber: number;
  drawNumber: number;
  setActiveDropdown: (dropdown: ActiveDropdown) => void;
  handleAuth: () => void;
  handleSettings: () => void;
  handleLeaveMatch: () => void;
  handleRules: () => void;
  handleContact: () => void;
}

/**
 * @description This is the navigation bar component, its is a navigation menu with the match stats.
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
 * @param {handleRules} handleRules - A function to handle viewing the rules.
 * @param {number} drawNumber - How often a Power-up draw round occurs
 * @param {handleContact} handleContact - A function to handle viewing the contact page.
 */

export const NavigationBar: FC<Props> = ({ isInMatch, isAuthenticated, totalDice, stageNumber, drawNumber }) => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>();
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [volume, setVolume] = useState(50);
  const isMobile = useIsMobile();
  const showModal = useStore((state) => state.showModal);
  const navigate = useNavigate();

  const setModalWithContainer = useStore((state) => state.setModalWithContainer);
  const setModalComponentChildren = useStore((state) => state.setModalComponentChildren);
  const logout = useLogout();
  const { broadcastPlayerLeft } = useMatch();

  const handleContact = () => navigate(routes.contact);

  const handleRules = () => showModal("power-up-list-description");

  const useOnClickOutsideDropdown = (ref: React.RefObject<HTMLElement>, isOpen: boolean) => {
    useOnClickOutside(ref, () => isOpen && setActiveDropdown(undefined));
  };

  const handleDropdownClick = (dropdown: ActiveDropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(undefined);
    } else {
      setActiveDropdown(dropdown);
      setIsComponentVisible(true);
    }
  };

  const handleAuth = () => {
    if (!isAuthenticated) {
      navigate(routes.login);
      return;
    }

    broadcastPlayerLeft();
    logout();
    setActiveDropdown(undefined);
    navigate(routes.root);
  };

  const handleSettings = () => {
    setModalWithContainer(true);
    setModalComponentChildren("match-settings-overview");
  };

  const handleLeaveMatch = async () => {
    const res = await broadcastPlayerLeft();
    if (isNkError(res)) {
      // TODO: show error to user
      console.warn(res);
    } else {
      navigate(routes.home);
    }
  };

  if (isMobile) return <></>;

  return (
    <NavigationWrapper>
      <MatchStats totalDice={totalDice} stageNumber={stageNumber} drawNumber={drawNumber} />
      <TopNavigation
        currentVolume={volume}
        handleVolumeChange={(volume) => setVolume(volume)}
        isInMatch={isInMatch}
        isDropdownContentVisible={isComponentVisible}
        activeDropdown={activeDropdown}
        onClickOutsideDropdown={useOnClickOutsideDropdown}
        setActiveDropdown={handleDropdownClick}
        handleAuth={handleAuth}
        handleLeaveMatch={handleLeaveMatch}
        onClickSettings={handleSettings}
        onClickRules={handleRules}
        onClickContact={handleContact}
        isAuthenticated={isAuthenticated}
      />
    </NavigationWrapper>
  );
};
