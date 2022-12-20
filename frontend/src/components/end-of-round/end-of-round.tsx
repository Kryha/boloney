import { FC } from "react";

import { useLocalPlayer } from "../../service";
import { ErrorView } from "../error-view";
import { TurnActionHeader, IdlePlayerHeader } from "../player-turn-headers";
import { ActivePlayerResults, IdlePlayerResults } from "../player-turn-results";
import { TurnActionWrapper, IdlePlayerWrapper } from "../player-turns/styles";

export const EndOfRound: FC = () => {
  const localPlayer = useLocalPlayer();

  if (!localPlayer) return <ErrorView />;

  if (localPlayer.isActive) {
    return (
      <TurnActionWrapper>
        <TurnActionHeader />
        <ActivePlayerResults />
      </TurnActionWrapper>
    );
  }

  return (
    <IdlePlayerWrapper>
      <IdlePlayerHeader step="results" />
      <IdlePlayerResults />
    </IdlePlayerWrapper>
  );
};
