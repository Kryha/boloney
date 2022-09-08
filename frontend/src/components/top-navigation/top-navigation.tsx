import { FC, useState } from "react";

import { Paragraph } from "../atoms/text";
import { text } from "../../assets/text";
import { useCountdownTimer } from "../../hooks/use-countdown";
import { GAME_TIME_MINUTES, GAME_TIME_SECONDS } from "../../constants";
import { TopNavigationSection, CountdownTimer, Divider, Timer, MenuContainer, MenuWrapper, ChildrenContainer } from "./styles";
import { ExitButton, InfoButton, MenuButton } from "../buttons";

// TODO: complete control component
export const TopNavigation: FC = () => {
  const [time, timer] = useCountdownTimer();
  const [toggleMenu, setToggleMenu] = useState(true);
  const [hover, setHover] = useState(false);

  return (
    <TopNavigationSection>
      <CountdownTimer isHovered={hover}>
        {/* TODO: remove onClick */}
        <Paragraph onClick={() => timer.startTimer(GAME_TIME_MINUTES, GAME_TIME_SECONDS)}>{time}</Paragraph>
        <Timer />
      </CountdownTimer>
      <Divider />
      <MenuWrapper>
        <MenuContainer onClick={() => setToggleMenu(!toggleMenu)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <MenuButton text={"menu"} isOpen={toggleMenu} />
        </MenuContainer>
        <ChildrenContainer isHidden={toggleMenu}>
          <InfoButton text={"info"} />
          <ExitButton text={"exit"} />
        </ChildrenContainer>
      </MenuWrapper>
    </TopNavigationSection>
  );
};
