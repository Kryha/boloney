import { FC, ReactNode } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { HUD } from "../hud";
import { ContentContainer, MainContentContainer } from "./styles";
import { TopNavigation } from "../top-navigation";
import { OverlayWrapper } from "../overlay-wrapper";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { fakeDiceRolls } from "../../service/fake-dice";
import { fakeLocalPlayer, fakePlayers } from "../../service/fake-players";
import { fakePowerUps } from "../../service/fake-power-ups";

interface GameLayoutProps {
  children?: ReactNode;
}

export const GameLayout: FC<GameLayoutProps> = ({ children }) => {
  const dice = fakeDiceRolls;
  const remotePlayers = fakePlayers;
  const localPlayer = fakeLocalPlayer;
  const powerUpIds = fakePowerUps;

  if (!localPlayer) return <ErrorView />;

  return (
    <>
      <TopNavigation isInMatch />
      <GamePlayersOverview players={remotePlayers} />
      <HUD dice={dice} powerUpIds={powerUpIds} player={localPlayer} />
      <MainContentContainer>
        <ContentContainer>{children}</ContentContainer>
      </MainContentContainer>
      <OverlayWrapper />
    </>
  );
};
