import { FC } from "react";
import { ExactDartBoard, text } from "../../assets";
import { useMatch } from "../../service";
import { useStore } from "../../store";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";
import { ExactImage, CallExactWrapper } from "./styles";

export const CallExact: FC = () => {
  const { broadcastCallExact } = useMatch();
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);

  return (
    <CallExactWrapper>
      <BottomButtonWrapper>
        <ExactImage src={ExactDartBoard} alt={text.playerTurn.exact} />
        <PrimaryButton
          text={text.playerTurn.continue}
          onClick={() => {
            setTurnActionStep("evaluateWinner");
            broadcastCallExact();
          }}
        />
      </BottomButtonWrapper>
    </CallExactWrapper>
  );
};
