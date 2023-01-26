import { FC } from "react";
import { text } from "../../assets";
import { useMatch } from "../../service";
import { useStore } from "../../store";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";
import { ActionImage, CallActionWrapper } from "./styles";

interface CallActionProps {
  isCallBoloney?: boolean;
  image: string;
  alt: string;
}

export const CallAction: FC<CallActionProps> = ({ isCallBoloney = false, image, alt }) => {
  const { broadcastCallBoloney, broadcastCallExact } = useMatch();
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const broadcastAction = isCallBoloney ? broadcastCallBoloney : broadcastCallExact;

  const takeAction = () => {
    setTurnActionStep("results");
    broadcastAction();
  };

  return (
    <CallActionWrapper>
      <BottomButtonWrapper>
        <ActionImage src={image} alt={alt} isCallBoloney={isCallBoloney} />
        <PrimaryButton text={text.playerTurn.continueWithAction} onClick={() => takeAction()} />
      </BottomButtonWrapper>
    </CallActionWrapper>
  );
};
