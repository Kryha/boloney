import { FC, useState } from "react";

import { TopNavigationSection, CountdownTimer, Divider, Timer } from "./styles";
import { MenuDropdown } from "./menu";
import { RulesDropdown } from "./rules";

interface Props {
  isInGame?: boolean;
}

export type ActiveDropdown = "rules" | "menu" | undefined;

export const TopNavigation: FC<Props> = ({ isInGame }) => {
  const [hover, setHover] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>();

  const handleDropdownClick = (dropdown: ActiveDropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(undefined);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <TopNavigationSection>
      {isInGame && (
        <>
          <CountdownTimer isHovered={hover}>
            <Timer />
          </CountdownTimer>
          <Divider />
        </>
      )}
      <RulesDropdown setHover={setHover} isActive={activeDropdown === "rules"} setActiveDropdown={handleDropdownClick} />
      <Divider />
      <MenuDropdown setHover={setHover} isActive={activeDropdown === "menu"} setActiveDropdown={handleDropdownClick} />
    </TopNavigationSection>
  );
};
