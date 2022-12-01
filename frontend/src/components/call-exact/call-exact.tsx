import { FC } from "react";
import { text } from "../../assets";
import { useMatch } from "../../service";
import { useStore } from "../../store";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";

// TODO: update component styles
export const CallExact: FC = () => {
  const { broadcastCallExact } = useMatch();
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  return (
    <BottomButtonWrapper>
      <PrimaryButton
        text={text.playerTurn.continue}
        onClick={() => {
          setTurnActionStep("evaluateWinner");
          broadcastCallExact();
        }}
      />
    </BottomButtonWrapper>
  );
};
