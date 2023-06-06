import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { ActiveDropdown, TopNavigation } from "../../molecules";
import { routes } from "../../navigation";
import { useLogout, useMatch } from "../../service";
import { useSession, useStore } from "../../store";
import { isNkError } from "../../types";
import { NavigationWrapper } from "./styles";

export const GeneralNavigationBar: FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>();
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [volume, setVolume] = useState(50);
  const session = useSession();
  const showModal = useStore((state) => state.showModal);
  const navigate = useNavigate();

  const setModalWithContainer = useStore((state) => state.setModalWithContainer);
  const setModalComponentChildren = useStore((state) => state.setModalComponentChildren);
  const logout = useLogout();
  const { broadcastPlayerLeft } = useMatch();

  const isAuthenticated = !!session;

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

  const handleSettings = () => {
    setModalWithContainer(true);
    setModalComponentChildren("match-settings-overview");
  };

  const onLeaveMatchClick = async () => {
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
      <TopNavigation
        currentVolume={volume}
        handleVolumeChange={(volume) => setVolume(volume)}
        isDropdownContentVisible={isComponentVisible}
        activeDropdown={activeDropdown}
        onClickOutsideDropdown={useOnClickOutsideDropdown}
        setActiveDropdown={handleDropdownClick}
        onAuthClick={onAuthClick}
        onLeaveMatchClick={onLeaveMatchClick}
        onSettingsClick={handleSettings}
        onClickRules={handleRules}
        onClickContact={handleContact}
        isAuthenticated={isAuthenticated}
      />
    </NavigationWrapper>
  );
};
