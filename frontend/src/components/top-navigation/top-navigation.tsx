import { FC, useRef, useState } from "react";

import { TopNavigationSection } from "./styles";
import { MenuDropdown } from "./menu";
import { RulesDropdown } from "./rules";
import { VerticalDivider } from "../../atoms";
import { MatchStats } from "./match-state/match-stats";
import { useOnClickOutside } from "usehooks-ts";
import { NavigationLocation } from "../../types";
import { containerHeight } from "../../design";
import { useIsMobile } from "../../hooks";

interface Props {
  location?: NavigationLocation;
}

export type ActiveDropdown = "rules" | "menu" | undefined;

export const TopNavigation: FC<Props> = ({ location }) => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>();
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef(null);
  const isMobile = useIsMobile();

  const handleDropdownClick = (dropdown: ActiveDropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(undefined);
    } else {
      setActiveDropdown(dropdown);
      setIsComponentVisible(true);
    }
  };

  useOnClickOutside(ref, () => {
    setActiveDropdown(undefined);
  });

  if (isMobile) return <></>;

  return (
    <TopNavigationSection ref={ref}>
      {location === "match" && <MatchStats />}
      <RulesDropdown
        isActive={activeDropdown === "rules" && isComponentVisible}
        setActiveDropdown={handleDropdownClick}
        isInMatch={location === "match"}
      />
      <VerticalDivider height={containerHeight.fluid} />
      <MenuDropdown
        isActive={activeDropdown === "menu" && isComponentVisible}
        setActiveDropdown={handleDropdownClick}
        location={location}
      />
    </TopNavigationSection>
  );
};
