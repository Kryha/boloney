import { FC, ReactNode } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { HUD } from "../hud";
import { Player } from "../../interfaces/player";

import { ContentContainer, MainContentContainer } from "./styles";
import { Die } from "../../interfaces";

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
