import { FC } from "react";
import { DiceContainer, Die } from "./styles";
import { Die as DieComponent } from "../die";

import { usePlaceBidFormState } from "./bid-state";
import { Bid } from "../../types";

interface DiceFaceProps {
  lastBid?: Bid;
  dieColor: string;
}

export const DiceFaces: FC<DiceFaceProps> = ({ lastBid, dieColor }) => {
  const pipAmount = usePlaceBidFormState((state) => state.pipAmount);
  const faceValue = usePlaceBidFormState((state) => state.faceValue);
  const diceAmount = usePlaceBidFormState((state) => state.diceAmount);

  const setFaceValues = usePlaceBidFormState((state) => state.setFaceValue);
  const setDiceAmount = usePlaceBidFormState((state) => state.setDiceAmount);

  const handleClick = (die: number) => {
    if (lastBid && lastBid.face > die) return;
    setFaceValues(die);
    if (die === lastBid?.face && diceAmount === lastBid.amount) {
      setDiceAmount((diceAmount || 1) + 1);
    }
  };

  return (
    <DiceContainer>
      {pipAmount.map((die, index) => (
        <Die key={index} disabled={!!lastBid && lastBid.face > die} isSelected={faceValue === die} onClick={() => handleClick(die)}>
          <DieComponent faceColor={dieColor} value={die} size={faceValue === die ? "110px" : "100px"} />
        </Die>
      ))}
    </DiceContainer>
  );
};
