import { FC, ReactNode } from "react";
import { MatchContentWrapper } from "../../atoms";
import { FadeTransition, Loading } from "../../components";
import { usePlaySound } from "../../hooks";
import { ErrorView, GetPowerUps, MatchLayout } from "../../organisms";
import { useChatHistory, useDeleteNotification, useIsInMatch, useJoinMatch, useLocalPlayer, useNotificationListener } from "../../service";
import { useStore } from "../../store";
import { MatchStage } from "../../types";

interface MatchProps {
  matchId: string;
}

export const Match: FC<MatchProps> = ({ matchId }) => {
  const matchStage = useStore((state) => state.matchStage);
  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);

  const { deleteNotification } = useDeleteNotification();
  const { notifications } = useNotificationListener();
  const playSound = usePlaySound();
  const localPlayer = useLocalPlayer();
  const isInMatch = useIsInMatch();

  const joinMatchDone = useJoinMatch(matchId);
  const joinChatDone = useChatHistory(joinMatchDone);
  const isLoading = joinMatchDone && joinChatDone;

  if (isLoading) return <Loading />;

  if (!localPlayer) return <ErrorView />;

  const getStageComponent = (stage: MatchStage): ReactNode => {
    switch (stage) {
      case "getPowerUpStage":
        return <GetPowerUps localPlayer={localPlayer} setSpinnerVisibility={setSpinnerVisibility} />;
      //  TODO: add other stages
    }
  };

  return (
    <FadeTransition>
      <MatchLayout
        localPlayer={localPlayer}
        isInMatch={isInMatch}
        notifications={notifications}
        deleteNotification={deleteNotification}
        playSound={playSound}
        matchStage={matchStage}
      >
        <MatchContentWrapper withoutSideMargins={matchStage === "endOfMatchStage"}>{getStageComponent(matchStage)}</MatchContentWrapper>
      </MatchLayout>
    </FadeTransition>
  );
};
