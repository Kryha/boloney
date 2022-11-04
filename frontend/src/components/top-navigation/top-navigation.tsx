import { FC, useRef, useState } from "react";

import { TopNavigationSection } from "./styles";
import { MenuDropdown } from "./menu";
import { RulesDropdown } from "./rules";
import { useStore } from "../../store";
import { VerticalDivider } from "../atoms";
import { MatchStats } from "./match-state/match-stats";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  isInMatch?: boolean;
}

export type ActiveDropdown = "rules" | "menu" | undefined;

export const TopNavigation: FC<Props> = ({ isInMatch }) => {
  const setIsOverlayVisible = useStore((state) => state.setIsOverlayVisible);

  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>();
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef(null);

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

  useOnClickOutside(ref, () => {
    setActiveDropdown(undefined);
  });

  return (
    <TopNavigationSection ref={ref}>
      {isInMatch && <MatchStats />}
      <RulesDropdown isActive={activeDropdown === "rules" && isComponentVisible} setActiveDropdown={handleDropdownClick} />
      <VerticalDivider />
      <MenuDropdown isActive={activeDropdown === "menu" && isComponentVisible} setActiveDropdown={handleDropdownClick} />
    </TopNavigationSection>
  );
};
