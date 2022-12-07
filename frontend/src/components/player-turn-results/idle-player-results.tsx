import { text } from "../../assets";
import { color } from "../../design";
import { useActivePlayer } from "../../service";
import { BottomButtonWrapper, Heading1, Heading2 } from "../atoms";
import { ButtonReady } from "../button-ready";
import { ErrorView } from "../error-view";
import { ActivePlayerResult } from "./active-player-result";

export const IdlePlayerResults = () => {
  const activePlayer = useActivePlayer();

  if (!activePlayer) return <ErrorView />;

  return (
    <BottomButtonWrapper>
      {activePlayer.isTarget ? (
        <ActivePlayerResult />
      ) : (
        <>
          <Heading1>{text.playerTurn.weHaveAWinner}</Heading1>
          <Heading2 customColor={color.darkGrey}>{text.playerTurn.itsTequilaUnderTheBridge}</Heading2>
          <ButtonReady />
        </>
      )}
    </BottomButtonWrapper>
  );
};
