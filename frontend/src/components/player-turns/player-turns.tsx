import { FC } from "react";

import { ErrorView } from "../error-view";
import { PickAction } from "./pick-action";
import { IdlePlayerWrapper, TurnActionWrapper } from "./styles";
import { IdlePlayerHeader, TurnActionHeader } from "../player-turn-headers";
import { useLocalPlayer } from "../../service";
import { useStore } from "../../store";
import { ProceedWithAction } from "./proceed-with-action";

export const PlayerTurns: FC = () => {
  const localPlayer = useLocalPlayer();
  const turnActionStep = useStore((state) => state.turnActionStep);

  if (!localPlayer) return <ErrorView />;

  if (localPlayer.isActive) {
    return (
      <TurnActionWrapper>
        <TurnActionHeader />
        {turnActionStep === "pickAction" ? <PickAction /> : <ProceedWithAction />}
      </TurnActionWrapper>
    );
  }

  return (
    <IdlePlayerWrapper>
      <IdlePlayerHeader />
    </IdlePlayerWrapper>
  );
};
