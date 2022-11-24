import { FC, ReactNode } from "react";

import { GamePlayersOverview } from "../game-players-overview";
import { HUD } from "../hud";
import { ContentContainer, MainContentContainer } from "./styles";
import { TopNavigation } from "../top-navigation";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { isStageWithHUD } from "../../util";
import { PlayerMenu } from "../player-menu";

interface GameLayoutProps {
  children?: ReactNode;
}

export const GameLayout: FC<GameLayoutProps> = ({ children }) => {
  const dice = useStore((state) => state.diceValue);
  const localPlayer = useStore((state) => state.getLocalPlayer());
  const powerUpIds = useStore((state) => state.powerUpIds);
  const matchStage = useStore((state) => state.matchStage);

  if (!localPlayer) return <ErrorView />;

  return (
    <>
      <TopNavigation isInMatch={matchStage !== "endOfMatchStage"} isStatsVisible />

      <GamePlayersOverview />

      {isStageWithHUD(matchStage) && <HUD dice={dice} powerUpIds={powerUpIds} player={localPlayer} />}

      <PlayerMenu />

      <MainContentContainer isStageWithHUD={isStageWithHUD(matchStage)}>
        <ContentContainer>{children}</ContentContainer>
      </MainContentContainer>
    </>
  );
};
