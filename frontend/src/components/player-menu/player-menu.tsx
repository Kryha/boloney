import { FC } from "react";

import { PlayerMenuWrapper, PlayerMenuContainer } from "./styles";
import { History } from "../history";
import { Chat } from "../chat";
import { ToggleMenu } from "./toggle-menu";

export const PlayerMenu: FC = () => {
  return (
    <PlayerMenuWrapper>
      <PlayerMenuContainer>
        <History />
        <ToggleMenu />
        <Chat />
      </PlayerMenuContainer>
    </PlayerMenuWrapper>
  );
};
