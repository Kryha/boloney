import { FC, ReactNode, useEffect, useRef } from "react";

import { HUD } from "../hud";
import { ContentContainer, MainContentContainer } from "./styles";
import { TopNavigation } from "../top-navigation";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { isStageWithHUD } from "../../util";
import { PlayerMenu } from "../player-menu";
import { useIsInMatch, useLocalPlayer, useNotificationListener } from "../../service";
import { MatchNotification } from "../notification";
import { usePlaySound } from "../../hooks";
import { gainPowerUp } from "../../assets";
import { MatchPlayersOverview } from "../../organisms";

interface MatchLayoutProps {
  children?: ReactNode;
}

export const MatchLayout: FC<MatchLayoutProps> = ({ children }) => {
  const dice = useStore((state) => state.diceValue);
  const localPlayer = useLocalPlayer();
  const powerUpIds = useStore((state) => state.powerUpIds);
  const matchStage = useStore((state) => state.matchStage);
  const isInMatch = useIsInMatch();
  const { notifications } = useNotificationListener();
  const playSound = usePlaySound();

  //TODO: abstract this in a more reactive way
  const powerUpAmount = useRef(0);

  const notification = notifications.at(0);

  const location = isInMatch ? "match" : "default";

  useEffect(() => {
    if (powerUpAmount.current < powerUpIds.length) {
      playSound(gainPowerUp);
    }

    powerUpAmount.current = powerUpIds.length;
  }, [playSound, powerUpIds]);

  if (!localPlayer) return <ErrorView />;

  return (
    <>
      <TopNavigation location={location} />

      <MatchPlayersOverview />

      {isStageWithHUD(matchStage) && <HUD dice={dice} powerUpIds={powerUpIds} player={localPlayer} />}

      <PlayerMenu />

      <MainContentContainer isStageWithHUD={isStageWithHUD(matchStage)} isInMatch={isInMatch}>
        <ContentContainer>{children}</ContentContainer>
        {notification && <MatchNotification notification={notification} isMultipleMessage={notifications.length > 1} />}
      </MainContentContainer>
    </>
  );
};
