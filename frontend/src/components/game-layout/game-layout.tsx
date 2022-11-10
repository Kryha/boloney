import { FC, ReactNode } from "react";

import { Die, Player, PowerUpId } from "../../types";
import { GamePlayersOverview } from "../game-players-overview";
import { HUD } from "../hud";
import { ContentContainer, MainContentContainer } from "./styles";
import { TopNavigation } from "../top-navigation";
import { OverlayWrapper } from "../overlay-wrapper";

interface GameLayoutProps {
  players: Player[];
  dice?: Die[];
  children?: ReactNode;
  powerUpIds?: PowerUpId[];
  localPlayer: Player;
}

export const GameLayout: FC<GameLayoutProps> = ({ players, dice, children, powerUpIds, localPlayer }) => {
  const remotePlayers: Player[] = players.filter((player) => player.userId !== localPlayer.userId);
  return (
    <>
      <TopNavigation isInMatch />
      <GamePlayersOverview players={remotePlayers} />
      <HUD dice={dice} powerUpIds={powerUpIds} localPlayer={localPlayer} />
      <MainContentContainer>
        <ContentContainer>{children}</ContentContainer>
      </MainContentContainer>
      <OverlayWrapper />
    </>
  );
};
