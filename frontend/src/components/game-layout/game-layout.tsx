import { FC, ReactNode } from "react";

import { Die, Player } from "../../types";
import { GamePlayersOverview } from "../game-players-overview";
import { HUD } from "../hud";
import { ContentContainer, MainContentContainer } from "./styles";

interface GameLayoutProps {
  players: Player[];
  dice?: Die[];
  children?: ReactNode;
}

export const GameLayout: FC<GameLayoutProps> = ({ players, dice, children }) => {
  return (
    <>
      <GamePlayersOverview players={players} />
      <HUD dice={dice} />
      <MainContentContainer>
        <ContentContainer>{children}</ContentContainer>
      </MainContentContainer>
    </>
  );
};
