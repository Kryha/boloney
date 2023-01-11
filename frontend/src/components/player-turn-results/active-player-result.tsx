import { FC } from "react";

import { getResultData } from "../../assets/local-data/player-result";
import { useLocalPlayer, useWinner } from "../../service";
import { useStore } from "../../store";
import { BottomButtonWrapper } from "../atoms";
import { ButtonReady } from "../button-ready";
import { ErrorView } from "../error-view";
import { ActivePlayerImage, ActivePlayerResultWrapper } from "./styles";
import { ActivePlayerTextResults, TargetPlayerTextResults } from "./text-results";

export const ActivePlayerResults: FC = () => {
  const lastAction = useStore((state) => state.lastAction);
  const winner = useWinner();
  const localPlayer = useLocalPlayer();

  if (!winner || !localPlayer) return <ErrorView />;

  const isWinner = localPlayer.actionRole === "winner";

  const playerData = getResultData(lastAction, winner);
  const actionImg = isWinner ? playerData.winnerImg : playerData.loserImg;

  return (
    <ActivePlayerResultWrapper>
      <BottomButtonWrapper>
        {localPlayer.isActive ? (
          <TargetPlayerTextResults data={playerData} isWinner={isWinner} />
        ) : (
          <ActivePlayerTextResults data={playerData} isWinner={isWinner} />
        )}
        <ActivePlayerImage src={actionImg} alt={playerData.name} isBoloney={lastAction === "Boloney"} />
        <ButtonReady />
      </BottomButtonWrapper>
    </ActivePlayerResultWrapper>
  );
};
