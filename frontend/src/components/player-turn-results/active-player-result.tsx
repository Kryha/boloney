import { FC } from "react";
import { getResultData } from "../../assets/local-data/player-result";
import { useActivePlayer } from "../../service";
import { useStore } from "../../store";
import { BottomButtonWrapper } from "../atoms";
import { ButtonReady } from "../button-ready";
import { ErrorView } from "../error-view";
import { ActivePlayerImage, ActivePlayerResultWrapper } from "./styles";
import { ActivePlayerTextResults, TargetPlayerTextResults } from "./text-results";

export const ActivePlayerResult: FC = () => {
  const action = useStore((state) => state.action);
  const activePlayer = useActivePlayer();
  // TODO: get actual data and remove fake data
  const isWinner = false;
  const isTargetPlayer = false;

  if (!activePlayer) return <ErrorView />;

  const playerData = getResultData(action, activePlayer);

  return (
    <ActivePlayerResultWrapper>
      <BottomButtonWrapper>
        {isTargetPlayer ? (
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
