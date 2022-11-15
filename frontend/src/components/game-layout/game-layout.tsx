import { FC, ReactNode } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { HUD } from "../hud";
import { ContentContainer, MainContentContainer } from "./styles";
import { TopNavigation } from "../top-navigation";
import { OverlayWrapper } from "../overlay-wrapper";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";

interface GameLayoutProps {
  children?: ReactNode;
}

export const GameLayout: FC<GameLayoutProps> = ({ children }) => {
  const session = useStore((state) => state.sessionState);
  const dice = useStore((state) => state.diceValue);
  const remotePlayers = useStore((state) => state.getRemotePlayers(session?.user_id));
  const localPlayer = useStore((state) => state.getPlayer(session?.user_id));
  const powerUpIds = useStore((state) => state.powerUpIds);

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
