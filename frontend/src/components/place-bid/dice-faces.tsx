import { FC } from "react";
import { DiceContainer, Die, bidDieSize } from "./styles";
import { Die as DieComponent } from "../die";

import { usePlaceBidFormState } from "./bid-state";
import { Bid } from "../../types";
import { ARRAY_OF_POSABLE_DIE_FACES as ARRAY_OF_POSABLE_DIE_FACES } from "../../constants";
import { useTotalDiceInMatch } from "../../service";

interface DiceFaceProps {
  lastBid?: Bid;
  dieColor: string;
}

export const DiceFaces: FC<DiceFaceProps> = ({ lastBid, dieColor }) => {
  const faceValue = usePlaceBidFormState((state) => state.faceValue);
  const diceAmount = usePlaceBidFormState((state) => state.diceAmount);
  const diceInMatch = useTotalDiceInMatch();

  const setFaceValues = usePlaceBidFormState((state) => state.setFaceValue);
  const setDiceAmount = usePlaceBidFormState((state) => state.setDiceAmount);

  const handleClick = (die: number) => {
    setFaceValues(die);
    if (!lastBid) return;

    if (die <= lastBid?.face && diceAmount === lastBid.amount) {
      setDiceAmount((diceAmount || 1) + 1);
    }
  };

  return (
    <DiceContainer>
      {ARRAY_OF_POSABLE_DIE_FACES.map((die, index) => (
        <Die key={index} disabled={isDisabled(lastBid, die, diceInMatch)} isSelected={faceValue === die} onClick={() => handleClick(die)}>
          <DieComponent faceColor={dieColor} value={die} size={faceValue === die ? bidDieSize.selected : bidDieSize.idle} />
        </Die>
      ))}
    </DiceContainer>
  );
};

const isDisabled = (lastBid: Bid | undefined, die: number, diceInMatch: number) => {
  return !!lastBid && lastBid.amount === diceInMatch && lastBid.face >= die;
};
