import { FC } from "react";

import { color } from "../../design";
import { PlayerMenuWrapper, PlayerMenuContainer } from "./styles";

interface PlayerMenuProps {}

export const PlayerMenu: FC<DiceOverviewProps> = () => {
  return (
    <PlayerMenuWrapper>
      <PlayerMenuContainer></PlayerMenuContainer>
    </PlayerMenuWrapper>
  );
};
