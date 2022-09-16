import { FC, useState } from "react";

import { TopNavigationSection, CountdownTimer, Divider, Timer } from "./styles";
import { MenuDropdown } from "./menu";

export const TopNavigation: FC = () => {
  const [hover, setHover] = useState(false);

  return (
    <TopNavigationSection>
      <CountdownTimer isHovered={hover}>
        <Timer />
      </CountdownTimer>
      <Divider />
      <MenuDropdown setHover={setHover} />
    </TopNavigationSection>
  );
};
