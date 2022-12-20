import { text } from "../../assets";
import { color } from "../../design";
import { useLocalPlayer, useWinner } from "../../service";
import { useStore } from "../../store";
import { BottomButtonWrapper, Heading1, Heading2 } from "../atoms";
import { ButtonReady } from "../button-ready";
import { ErrorView } from "../error-view";
import { ActivePlayerResults } from "./active-player-result";

export const IdlePlayerResults = () => {
  const localPlayer = useLocalPlayer();
  const winner = useWinner();
  const lastAction = useStore((state) => state.lastAction);

  if (!localPlayer || !winner || !lastAction) return <ErrorView />;

  return (
    <BottomButtonWrapper>
      {localPlayer.isTarget ? (
        <ActivePlayerResults />
      ) : (
        <>
          <Heading1>{text.playerTurn.weHaveAWinner}</Heading1>
          <Heading2 customColor={color.darkGrey}>{text.param.congratulationsIdlePlayer(winner.username, lastAction)}</Heading2>
          <ButtonReady />
        </>
      )}
    </BottomButtonWrapper>
  );
};
