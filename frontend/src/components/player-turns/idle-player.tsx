import { text } from "../../assets";
import { useStore } from "../../store";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";

export const IdlePlayer = () => {
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  // TODO: remove button
  return (
    <BottomButtonWrapper>
      <PrimaryButton text={text.playerTurn.continue} onClick={() => setTurnActionStep("results")} />
    </BottomButtonWrapper>
  );
};
