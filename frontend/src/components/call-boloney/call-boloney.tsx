import { FC } from "react";
import { BoloneyToaster, text } from "../../assets";
import { useMatch } from "../../service";
import { useStore } from "../../store";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";
import { BoloneyImage, CallBoloneyWrapper } from "./styles";

export const CallBoloney: FC = () => {
  const { broadcastCallBoloney } = useMatch();
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  return (
    <CallBoloneyWrapper>
      <BottomButtonWrapper>
        <BoloneyImage src={BoloneyToaster} alt={text.playerTurn.boloney} />
        <PrimaryButton
          text={text.playerTurn.continue}
          onClick={() => {
            setTurnActionStep("evaluateWinner");
            broadcastCallBoloney();
          }}
        />
      </BottomButtonWrapper>
    </CallBoloneyWrapper>
  );
};
