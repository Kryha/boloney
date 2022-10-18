import { FC, useState } from "react";

import { TopNavigationSection } from "./styles";
import { MenuDropdown } from "./menu";
import { RulesDropdown } from "./rules";
import { useUIState } from "../../store/ui";
import { VerticalDivider } from "../atoms";
import { OverlayWrapper } from "../overlay-wrapper";
import { MatchStats } from "./match-state/match-stats";

interface Props {
  isInMatch?: boolean;
}

export type ActiveDropdown = "rules" | "menu" | undefined;

export const TopNavigation: FC<Props> = ({ isInMatch }) => {
  const setIsOverlayVisible = useUIState((state) => state.setIsOverlayVisible);

  // TODO: use state variable
  const [hover, setHover] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>();
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  const handleClickOutside = () => {
    setHover(false);
    setIsComponentVisible(false);
    setIsOverlayVisible(false);
  };

  const handleDropdownClick = (dropdown: ActiveDropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(undefined);
      setIsOverlayVisible(false);
    } else {
      setActiveDropdown(dropdown);
      setIsOverlayVisible(!!dropdown);
      setIsComponentVisible(true);
    }
  };

  return (
    <OverlayWrapper handleClickOutside={handleClickOutside}>
      <TopNavigationSection>
        {isInMatch && <MatchStats />}
        <RulesDropdown
          setHover={setHover}
          isActive={activeDropdown === "rules" && isComponentVisible}
          setActiveDropdown={handleDropdownClick}
        />
        <VerticalDivider />
        <MenuDropdown
          setHover={setHover}
          isActive={activeDropdown === "menu" && isComponentVisible}
          setActiveDropdown={handleDropdownClick}
        />
      </TopNavigationSection>
    </OverlayWrapper>
  );
};
