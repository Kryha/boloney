import { FC } from "react";
import { getResultData } from "../../assets";

import { usePlayerWithRole, useLocalPlayer, useActivePlayer } from "../../service";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { TurnActionHeader, IdlePlayerHeader } from "../player-turn-headers";
import { ActivePlayerResults, IdlePlayerResult, TargetPlayerResult } from "../player-turn-results";

import { TurnActionWrapper, IdlePlayerWrapper } from "../player-turns/styles";

export const EndOfRound: FC = () => {
  const lastAction = useStore((state) => state.lastAction);
  const receivedPowerUps = useStore((state) => state.receivedPowerUps);
  const localPlayer = useLocalPlayer();
  const activePlayer = useActivePlayer();

  const winner = usePlayerWithRole("winner");
  const loserByTimeOut = usePlayerWithRole("timeOut");
  const player = loserByTimeOut ? loserByTimeOut : winner;

  const isActivePlayerWinner = activePlayer?.userId === winner?.userId;

  if (!localPlayer || !player) return <ErrorView />;

  const isWinner = localPlayer.actionRole === "winner";
  const playerData = getResultData(lastAction, localPlayer, winner, receivedPowerUps);
  const isBoloney = lastAction === "Boloney";

  if (localPlayer.isActive) {
    return (
      <TurnActionWrapper>
        <TurnActionHeader />
        <ActivePlayerResults actionRole={localPlayer.actionRole} isWinner={isWinner} playerData={playerData} isBoloney={isBoloney} />
      </TurnActionWrapper>
    );
  }

  return (
    <IdlePlayerWrapper>
      <IdlePlayerHeader step="results" />
      {localPlayer.isTarget && isBoloney ? (
        <TargetPlayerResult playerData={playerData} isWinner={isWinner} isBoloney={isBoloney} />
      ) : (
        <IdlePlayerResult player={player} lastAction={lastAction} isActivePlayerWinner={isActivePlayerWinner} />
      )}
    </IdlePlayerWrapper>
  );
};
