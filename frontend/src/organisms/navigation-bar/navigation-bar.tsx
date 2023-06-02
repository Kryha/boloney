import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { ActiveDropdown, MatchStats, TopNavigation } from "../../molecules";
import { routes } from "../../navigation";
import { useLogout, useMatch } from "../../service";
import { useStore } from "../../store";
import { isNkError } from "../../types";
import { NavigationWrapper } from "./styles";

interface Props {
  isInMatch?: boolean;
  isAuthenticated?: boolean;
  totalDice?: number;
  stageNumber?: number;
  drawNumber?: number;
}

/**
 * @description This is the navigation bar component, its is a navigation menu with the match stats.
 * @param {boolean} isInMatch - If we are currently in a match.
 * @param {boolean} isAuthenticated - If we are authenticated.
 * @param {number} totalDice - The total amount of dice in the match.
 * @param {number} stageNumber - Divides the current number of dice in play
 * @param {number} drawNumber - How often a Power-up draw round occurs
 */

export const NavigationBar: FC<Props> = ({ isInMatch, isAuthenticated, totalDice, stageNumber, drawNumber }) => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>();
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [volume, setVolume] = useState(50);
  // const isMobile = useIsMobile();
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

  return (
    <NavigationWrapper>
      {isInMatch && <MatchStats totalDice={totalDice} stageNumber={stageNumber} drawNumber={drawNumber} />}
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
