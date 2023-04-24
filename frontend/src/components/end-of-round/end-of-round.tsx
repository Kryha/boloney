import { FC } from "react";
import { getResultData } from "../../assets";

import { usePlayerWithRole, useLocalPlayer, useActivePlayer } from "../../service";
import { useStore } from "../../store";
import { GeneralContentWrapper } from "../../atoms";
import { ErrorView } from "../error-view";
import { FadeTransition } from "../page-transition";
import { TurnActionHeader, IdlePlayerHeader } from "../player-turn-headers";
import { ActivePlayerResults, IdlePlayerResult, TargetPlayerResult } from "../player-turn-results";

import { TurnActionWrapper, IdlePlayerWrapper } from "../player-turns/styles";
import { useClientTimer } from "../../hooks";

export const EndOfRound: FC = () => {
  const lastAction = useStore((state) => state.lastAction);
  const localPlayer = useLocalPlayer();
  const activePlayer = useActivePlayer();

  const winner = usePlayerWithRole("winner");
  const loser = usePlayerWithRole("loser");
  const loserByTimeOut = usePlayerWithRole("timeOut");
  const player = loserByTimeOut ? loserByTimeOut : winner;

  const isActivePlayerWinner = activePlayer?.userId === winner?.userId;

  useClientTimer();

  if (!localPlayer || !player) return <ErrorView />;

  const isWinner = localPlayer.actionRole === "winner";
  const playerData = getResultData(lastAction, localPlayer, winner);
  const isBoloney = lastAction === "Boloney";

  if (localPlayer.isActive) {
    return (
      <FadeTransition>
        <TurnActionWrapper>
          <TurnActionHeader />
          <GeneralContentWrapper withoutSideMargins>
            <ActivePlayerResults actionRole={localPlayer.actionRole} isWinner={isWinner} playerData={playerData} isBoloney={isBoloney} />
          </GeneralContentWrapper>
        </TurnActionWrapper>
      </FadeTransition>
    );
  }

  return (
    <FadeTransition>
      <IdlePlayerWrapper>
        <IdlePlayerHeader step="results" />
        <GeneralContentWrapper withoutSideMargins>
          {localPlayer.isTarget && isBoloney ? (
            <TargetPlayerResult playerData={playerData} isWinner={isWinner} isBoloney={isBoloney} />
          ) : (
            <IdlePlayerResult player={player} lastAction={lastAction} isActivePlayerWinner={isActivePlayerWinner} loser={loser} />
          )}
        </GeneralContentWrapper>
      </IdlePlayerWrapper>
    </FadeTransition>
  );
};
