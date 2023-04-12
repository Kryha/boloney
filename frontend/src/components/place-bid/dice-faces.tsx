import { FC } from "react";

import { DiceContainer, Die, selectorDieSize } from "./styles";
import { Die as DieComponent } from "../die";
import { usePlaceBidFormState } from "./bid-state";
import { Bid } from "../../types";
import { ARRAY_OF_POSABLE_DIE_FACES as ARRAY_OF_POSABLE_DIE_FACES } from "../../constants";
import { useTotalDiceInMatch } from "../../service";
import { radius } from "../../design";

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

  const isDisabled = (die: number) => {
    return !!lastBid && lastBid.amount === diceInMatch && lastBid.face >= die;
  };

  return (
    <DiceContainer>
      {ARRAY_OF_POSABLE_DIE_FACES.map((die, index) => (
        <Die key={index} disabled={isDisabled(die)} isSelected={faceValue === die} onClick={() => handleClick(die)}>
          <DieComponent
            iconColor={dieColor}
            value={die}
            size={faceValue === die ? selectorDieSize.selected : selectorDieSize.idle}
            radius={radius.sm}
          />
        </Die>
      ))}
    </DiceContainer>
  );
};
