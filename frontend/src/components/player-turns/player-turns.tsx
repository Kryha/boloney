import { FC } from "react";
import { ErrorView } from "../error-view";
import { PickAction } from "./pick-action";
import { ProceedWithAction } from "./proceed-with-action";
import { IdlePlayerWrapper, TurnActionWrapper } from "./styles";
import { IdlePlayerHeader, TurnActionHeader } from "../player-turn-headers";
import { useLocalPlayer } from "../../service";
import { ActivePlayerView } from "./active-player-view";

export const PlayerTurns: FC = () => {
  const localPlayer = useLocalPlayer();

  if (!localPlayer) return <ErrorView />;

  if (localPlayer.isActive) {
    return (
      <TurnActionWrapper>
        <TurnActionHeader />
        <ActivePlayerView>
          <PickAction />
          <ProceedWithAction />
        </ActivePlayerView>
      </TurnActionWrapper>
    );
  } else {
    return (
      <IdlePlayerWrapper>
        <IdlePlayerHeader />
      </IdlePlayerWrapper>
    );
  }
};
