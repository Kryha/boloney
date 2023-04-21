import { FC, useEffect, useState } from "react";

import { ErrorView } from "../error-view";
import { PickAction } from "./pick-action";
import { IdlePlayerWrapper, TurnActionWrapper } from "./styles";
import { IdlePlayerHeader, TurnActionHeader } from "../player-turn-headers";
import { useLocalPlayer } from "../../service";
import { useStore } from "../../store";
import { ProceedWithAction } from "./proceed-with-action";
import { FadeTransition } from "../page-transition";
import { usePlaySound } from "../../hooks";
import { playerTurnStart } from "../../assets";

export const PlayerTurns: FC = () => {
  const localPlayer = useLocalPlayer();
  const turnActionStep = useStore((state) => state.turnActionStep);
  const playSound = usePlaySound();

  // TODO: check for better solution based on data received
  const [soundsHasPlayed, setSoundHasPlayed] = useState(false);

  useEffect(() => {
    if (localPlayer?.isActive && !soundsHasPlayed) {
      playSound(playerTurnStart);
      setSoundHasPlayed(true);
    }
    if (!localPlayer?.isActive) setSoundHasPlayed(false);
  }, [playSound, localPlayer, turnActionStep, soundsHasPlayed]);

  if (!localPlayer) return <ErrorView />;

  if (localPlayer.isActive) {
    return (
      <FadeTransition>
        <TurnActionWrapper>
          <TurnActionHeader />
          {turnActionStep === "pickAction" ? <PickAction /> : <ProceedWithAction />}
        </TurnActionWrapper>
      </FadeTransition>
    );
  }

  return (
    <FadeTransition>
      <IdlePlayerWrapper>
        <IdlePlayerHeader />
      </IdlePlayerWrapper>
    </FadeTransition>
  );
};
