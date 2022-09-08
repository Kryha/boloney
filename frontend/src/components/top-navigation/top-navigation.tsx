import { FC, useState } from "react";

import { Paragraph } from "../atoms/text";
import { text } from "../../assets/text";
import { useCountdownTimer } from "../../hooks/use-countdown";
import { GAME_TIME_MINUTES, GAME_TIME_SECONDS } from "../../constants";
import { TopNavigationSection, CountdownTimer, Divider, Timer, MenuContainer, MenuWrapper, ChildrenContainer } from "./styles";
import { ExitButton, InfoButton, MenuButton } from "../buttons";

interface MenuDropdownProps {
  setHover?: (hover: boolean) => void;
}

export const MenuDropdown: FC<MenuDropdownProps> = ({ setHover }) => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);

  return (
    <MenuWrapper>
      <MenuContainer
        onClick={() => setToggleMenu(!toggleMenu)}
        onMouseEnter={() => setHover && setHover(true)}
        onMouseLeave={() => setHover && setHover(false)}
      >
        <MenuButton text={text.general.menu} isOpen={toggleMenu} />
      </MenuContainer>
      <ChildrenContainer isHidden={toggleMenu}>
        <InfoButton text={text.general.info} />
        <ExitButton text={text.general.exit} />
      </ChildrenContainer>
    </MenuWrapper>
  );
};
export const TopNavigation: FC = () => {
  const [time, timer] = useCountdownTimer();
  const [hover, setHover] = useState(false);

  return (
    <TopNavigationSection>
      <CountdownTimer isHovered={hover}>
        {/* TODO: remove onClick */}
        <Paragraph onClick={() => timer.startTimer(GAME_TIME_MINUTES, GAME_TIME_SECONDS)}>{time}</Paragraph>
        <Timer />
      </CountdownTimer>
      <Divider />
      <MenuDropdown setHover={setHover} />
    </TopNavigationSection>
  );
};
