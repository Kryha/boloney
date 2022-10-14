import { FC } from "react";
import { text } from "../../../assets";
import { param } from "../../../assets/text/param";
import { color, margins } from "../../../design";
import { GeneralText } from "../../atoms";
import { Die } from "../../die";
import { MatchStateItemContainer } from "../styles";

interface PropItem {
  diceAmount: number;
}

export const MatchStateItemDiceAMount: FC<PropItem> = ({ diceAmount }) => {
  return (
    <MatchStateItemContainer>
      <Die value={2} size={margins.small3} pipColor={color.black} faceColor={color.white} />
      <GeneralText>{param.amountXOfDice(diceAmount)}</GeneralText>
    </MatchStateItemContainer>
  );
};
