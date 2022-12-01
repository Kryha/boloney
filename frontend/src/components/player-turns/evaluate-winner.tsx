import { text } from "../../assets";

import { useStore } from "../../store";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";

export const EvaluateWinner = () => {
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);

  return (
    <BottomButtonWrapper>
      <PrimaryButton text={text.general.continue} onClick={() => setTurnActionStep("results")} />
    </BottomButtonWrapper>
  );
};
