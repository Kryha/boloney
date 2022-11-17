import { FC, ReactNode } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { HUD } from "../hud";
import { ContentContainer, MainContentContainer } from "./styles";
import { TopNavigation } from "../top-navigation";
import { OverlayWrapper } from "../overlay-wrapper";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { isStageWithHUD } from "../../util";

interface GameLayoutProps {
  children?: ReactNode;
}

export const GameLayout: FC<GameLayoutProps> = ({ children }) => {
  const dice = useStore((state) => state.diceValue);
  const remotePlayers = useStore((state) => state.getRemotePlayers());
  const localPlayer = useStore((state) => state.getLocalPlayer());
  const powerUpIds = useStore((state) => state.powerUpIds);
  const matchStage = useStore((state) => state.matchStage);

  if (!localPlayer || !remotePlayers) return <ErrorView />;

  return (
    <>
      <TopNavigation isInMatch />

      {isStageWithHUD(matchStage) && (
        <>
          <GamePlayersOverview players={remotePlayers} />
          <HUD dice={dice} powerUpIds={powerUpIds} player={localPlayer} />
        </>
      )}

      <MainContentContainer isStageWithHUD={isStageWithHUD(matchStage)}>
        <ContentContainer>{children}</ContentContainer>
      </MainContentContainer>
      <OverlayWrapper />
    </>
  );
};
