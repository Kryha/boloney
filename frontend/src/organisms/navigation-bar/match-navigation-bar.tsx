import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { ActiveDropdown, MatchNavigation } from "../../molecules";
import { routes } from "../../navigation";
import { useLogout, useMatch } from "../../service";
import { useSession, useStore } from "../../store";
import { NavigationWrapper } from "./styles";

export const MatchNavigationBar: FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>();
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [volume, setVolume] = useState(50);
  const session = useSession();
  const showModal = useStore((state) => state.showModal);
  const navigate = useNavigate();
  const navigateToContact = () => navigate(routes.contact);

  const logout = useLogout();
  const { broadcastPlayerLeft } = useMatch();

  const isAuthenticated = !!session;

  const showRulesModal = () => showModal("power-up-list-description");

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

  const onAuthClick = () => {
    if (!isAuthenticated) {
      navigate(routes.login);
      return;
    }

    broadcastPlayerLeft();
    logout();
    setActiveDropdown(undefined);
    navigate(routes.root);
  };

  return (
    <NavigationWrapper>
      <MatchNavigation
        currentVolume={volume}
        onVolumeChange={(volume) => setVolume(volume)}
        isDropdownContentVisible={isComponentVisible}
        activeDropdown={activeDropdown}
        onClickOutsideDropdown={useOnClickOutsideDropdown}
        onClickContact={navigateToContact}
        setActiveDropdown={handleDropdownClick}
        onAuth={onAuthClick}
        onClickRules={showRulesModal}
        isAuthenticated={isAuthenticated}
      />
    </NavigationWrapper>
  );
};
