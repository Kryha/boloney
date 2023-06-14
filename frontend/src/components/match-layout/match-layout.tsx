import { FC, ReactNode, useEffect, useRef } from "react";

import { HUD } from "../hud";
import { ContentContainer, MainContentContainer } from "./styles";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { isStageWithHUD } from "../../util";
import { useIsInMatch, useLocalPlayer, useNotificationListener, useTotalDiceInMatch } from "../../service";
import { MatchNotification } from "../notification";
import { usePlaySound } from "../../hooks";
import { gainPowerUp } from "../../assets";
import { MatchPlayersOverview, MatchNavigationBar, MatchOptionsBar } from "../../organisms";
import { PlayerMenu } from "../player-menu";

interface MatchLayoutProps {
  children?: ReactNode;
}

export const MatchLayout: FC<MatchLayoutProps> = ({ children }) => {
  const dice = useStore((state) => state.diceValue);
  const drawRoundCounter = useStore((state) => state.drawRoundCounter);
  const stageNumber = useStore((state) => state.stageNumber);
  const powerUpIds = useStore((state) => state.powerUpIds);
  const matchStage = useStore((state) => state.matchStage);
  const localPlayer = useLocalPlayer();
  const isInMatch = useIsInMatch();
  const { notifications } = useNotificationListener();
  const playSound = usePlaySound();
  const totalDice = useTotalDiceInMatch();

  //TODO: abstract this in a more reactive way
  const powerUpAmount = useRef(0);

  const notification = notifications.at(0);

  useEffect(() => {
    if (powerUpAmount.current < powerUpIds.length) {
      playSound(gainPowerUp);
    }

    powerUpAmount.current = powerUpIds.length;
  }, [playSound, powerUpIds]);

  if (!localPlayer) return <ErrorView />;

  return (
    <>
      {matchStage !== "endOfMatchStage" && (
        <MatchOptionsBar totalDice={totalDice} stageNumber={stageNumber} drawNumber={drawRoundCounter} />
      )}
      <MatchNavigationBar />

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
