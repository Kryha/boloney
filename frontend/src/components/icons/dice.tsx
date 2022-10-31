import { FC } from "react";
import { text } from "../../assets";
import { color, margins } from "../../design";
import { GeneralText } from "../atoms";
import { Die } from "../die";
import { DiceIconWrapper } from "./styles";

interface DiceUpProps {
  diceAmount: number;
  diceValue?: number;
}

export const DiceIcon: FC<DiceUpProps> = ({ diceAmount, diceValue }) => {
  return (
    <DiceIconWrapper>
      <Die value={diceValue} size={margins.small4} />
      <GeneralText customColor={color.darkGrey}>{text.param.xAmount(diceAmount)}</GeneralText>
    </DiceIconWrapper>
  );
};
