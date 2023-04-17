import { FC, ReactNode } from "react";

import { MatchPlayersOverview } from "../match-players-overview";
import { HUD } from "../hud";
import { ContentContainer, MainContentContainer } from "./styles";
import { TopNavigation } from "../top-navigation";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { isStageWithHUD } from "../../util";
import { PlayerMenu } from "../player-menu";
import { useArrangedPlayers, useIsInMatch, useLocalPlayer, useNotificationListener } from "../../service";
import { MatchNotification } from "../notification";

interface MatchLayoutProps {
  children?: ReactNode;
}

export const MatchLayout: FC<MatchLayoutProps> = ({ children }) => {
  const dice = useStore((state) => state.diceValue);
  const localPlayer = useLocalPlayer();
  const arrangedPlayers = useArrangedPlayers();
  const powerUpIds = useStore((state) => state.powerUpIds);
  const matchStage = useStore((state) => state.matchStage);
  const isInMatch = useIsInMatch();
  const { notifications } = useNotificationListener();

  const notification = notifications.at(0);

  const location = isInMatch ? "match" : "default";

  if (!localPlayer) return <ErrorView />;

  return (
    <>
      <TopNavigation location={location} />

      <MatchPlayersOverview playerOrder={arrangedPlayers} />

      {isStageWithHUD(matchStage) && <HUD dice={dice} powerUpIds={powerUpIds} player={localPlayer} />}

      <PlayerMenu />

      <MainContentContainer isStageWithHUD={isStageWithHUD(matchStage)} isInMatch={isInMatch}>
        <ContentContainer>{children}</ContentContainer>
        {notification && <MatchNotification notification={notification} isMultipleMessage={notifications.length > 1} />}
      </MainContentContainer>
    </>
  );
};
