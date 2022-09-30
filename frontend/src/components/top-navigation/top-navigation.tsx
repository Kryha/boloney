import { FC, useState } from "react";

import { TopNavigationSection, CountdownTimer, Timer } from "./styles";
import { MenuDropdown } from "./menu";
import { RulesDropdown } from "./rules";
import { useUIState } from "../../store/ui";
import { VerticalDivider } from "../atoms";
import { OverlayWrapper } from "../overlay-wrapper";

interface Props {
  isInGame?: boolean;
}

export type ActiveDropdown = "rules" | "menu" | undefined;

export const TopNavigation: FC<Props> = ({ isInGame }) => {
  const setIsOverlayVisible = useUIState((state) => state.setIsOverlayVisible);

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
      setIsOverlayVisible(true);
      setIsComponentVisible(true);
    }
  };

  return (
    <OverlayWrapper handleClickOutside={handleClickOutside}>
      <TopNavigationSection>
        {isInGame && (
          <>
            <CountdownTimer isHovered={hover}>
              <Timer />
            </CountdownTimer>
            <VerticalDivider />
          </>
        )}
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
