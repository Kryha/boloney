import { FC } from "react";

import { useLocalPlayer } from "../../service";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { TurnActionHeader, IdlePlayerHeader } from "../player-turn-headers";
import { ActivePlayerResult, IdlePlayerResults } from "../player-turn-results";
import { EvaluateWinner, IdlePlayer } from "../player-turns";
import { TurnActionWrapper, IdlePlayerWrapper } from "../player-turns/styles";

export const EndOfRound: FC = () => {
  const localPlayer = useLocalPlayer();
  const turnActionStep = useStore((state) => state.turnActionStep);

  if (!localPlayer) return <ErrorView />;

  const activePlayerView = () => {
    switch (turnActionStep) {
      case "results":
        return <ActivePlayerResult />;
      case "evaluateWinner":
      default:
        return <EvaluateWinner />;
    }
  };

  const idlePlayerView = () => {
    switch (turnActionStep) {
      case "results":
        return <IdlePlayerResults />;
      case "pickAction":
      default:
        return <IdlePlayer />;
    }
  };

  if (localPlayer.isActive) {
    return (
      <TurnActionWrapper>
        <TurnActionHeader />
        {activePlayerView()}
      </TurnActionWrapper>
    );
  } else {
    return (
      <IdlePlayerWrapper>
        <IdlePlayerHeader />
        {idlePlayerView()}
      </IdlePlayerWrapper>
    );
  }
};
