import { FC } from "react";
import { getResultData } from "../../assets";

import { usePlayerWithRole, useLocalPlayer } from "../../service";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { TurnActionHeader, IdlePlayerHeader } from "../player-turn-headers";
import { ActivePlayerResults, IdlePlayerResult, TargetPlayerResult } from "../player-turn-results";

import { TurnActionWrapper, IdlePlayerWrapper } from "../player-turns/styles";

export const EndOfRound: FC = () => {
  const localPlayer = useLocalPlayer();
  const lastAction = useStore((state) => state.lastAction);
  const receivedPowerUps = useStore((state) => state.receivedPowerUps);
  const winner = usePlayerWithRole("winner");
  const loserByTimeOut = usePlayerWithRole("timeOut");

  if (!localPlayer) return <ErrorView />;

  const isWinner = localPlayer.actionRole === "winner";
  const playerData = getResultData(lastAction, winner, receivedPowerUps);
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
      {localPlayer.isTarget ? (
        <TargetPlayerResult playerData={playerData} isWinner={isWinner} isBoloney={isBoloney} />
      ) : (
        <IdlePlayerResult player={loserByTimeOut} lastAction={lastAction} />
      )}
    </IdlePlayerWrapper>
  );
};
