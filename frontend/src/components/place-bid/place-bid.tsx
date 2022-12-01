import { FC } from "react";
import { text } from "../../assets";
import { useMatch } from "../../service";
import { useStore } from "../../store";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";

// TODO: update component styles
export const PlaceBid: FC = () => {
  const { broadcastPlaceBid } = useMatch();
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);

  const handleBid = () => {
    const face = Number(prompt("face"));
    const amount = Number(prompt("amount"));
    broadcastPlaceBid({ face, amount });
    setTurnActionStep("pickAction");
  };

  return (
    <BottomButtonWrapper>
      <PrimaryButton
        text={text.playerTurn.continue}
        onClick={() => {
          handleBid();
        }}
      />
    </BottomButtonWrapper>
  );
};
