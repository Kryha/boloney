import { FC } from "react";
import { text } from "../../assets";
import { color, margins } from "../../design";
import { GeneralText } from "../atoms";
import { Die } from "../die";
import { DiceIconWrapper } from "./styles";

interface DiceUpProps {
  diceAmount: number;
  diceValue?: number;
  faceColor?: string;
  pipColor?: string;
}

export const DiceIcon: FC<DiceUpProps> = ({ diceAmount, diceValue, faceColor, pipColor }) => {
  return (
    <DiceIconWrapper>
      <Die value={diceValue} size={margins.small4} faceColor={faceColor} pipColor={pipColor} />
      <GeneralText customColor={color.darkGrey}>{text.param.xAmount(diceAmount)}</GeneralText>
    </DiceIconWrapper>
  );
};
