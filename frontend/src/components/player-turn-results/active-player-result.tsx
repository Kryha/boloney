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

  return (
    <ActivePlayerResultWrapper>
      <BottomButtonWrapper>
        {localPlayer.isActive ? (
          <TargetPlayerTextResults data={playerData} isWinner={isWinner} />
        ) : (
          <ActivePlayerTextResults data={playerData} isWinner={isWinner} />
        )}
        <ActivePlayerImage src={playerData.img} alt={playerData.name} />
        <ButtonReady />
      </BottomButtonWrapper>
    </ActivePlayerResultWrapper>
  );
};
