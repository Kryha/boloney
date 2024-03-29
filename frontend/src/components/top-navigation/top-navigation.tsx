import { FC, useRef, useState } from "react";

import { TopNavigationSection } from "./styles";
import { MenuDropdown } from "./menu";
import { RulesDropdown } from "./rules";
import { VerticalDivider } from "../../atoms";
import { MatchStats } from "./match-state/match-stats";
import { useOnClickOutside } from "usehooks-ts";
import { NavigationLocation } from "../../types";
import { containerHeight } from "../../design";
import { useChangeVolume, useIsMobile } from "../../hooks";
import { Sound } from "../../molecules/sound";

interface Props {
  location?: NavigationLocation;
}

export type ActiveDropdown = "rules" | "menu" | "sound" | undefined;

export const TopNavigation: FC<Props> = ({ location }) => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>();
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  const { setVolume, masterVolume } = useChangeVolume();

  const isMobile = useIsMobile();
  const ref = useRef(null);

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

  const useOnClickOutsideDropdown = (ref: React.RefObject<HTMLElement>, isOpen: boolean) => {
    useOnClickOutside(ref, () => isOpen && setActiveDropdown(undefined));
  };

  if (isMobile) return <></>;

  return (
    <TopNavigationSection ref={ref}>
      {location === "match" && (
        <>
          <MatchStats />
          <Sound
            isOpen={activeDropdown === "sound" && isComponentVisible}
            expand={() => handleDropdownClick("sound")}
            onChange={(volume) => setVolume(volume)}
            currentVolume={masterVolume}
            onClickOutsideDropdown={useOnClickOutsideDropdown}
          />
        </>
      )}
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
