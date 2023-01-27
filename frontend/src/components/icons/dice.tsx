import { FC } from "react";
import Highlighter from "react-highlight-words";
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
  diceSum?: number;
}

export const DiceIcon: FC<DiceUpProps> = ({ diceAmount, diceValue, faceColor, pipColor, diceSum }) => {
  return (
    <DiceIconWrapper>
      <Die value={diceValue} size={margins.small4} faceColor={faceColor} pipColor={pipColor} />
      <GeneralText customColor={color.darkGrey}>{text.param.xAmount(diceAmount)}</GeneralText>
      {diceSum && (
        <GeneralText customColor={color.darkGrey}>
          <Highlighter
            highlightClassName="bold"
            searchWords={[String(diceSum)]}
            autoEscape
            textToHighlight={text.param.sumOfDice(diceSum)}
          />
        </GeneralText>
      )}
    </DiceIconWrapper>
  );
};
