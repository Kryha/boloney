import { FC } from "react";
import Highlighter from "react-highlight-words";
import { text } from "../../assets";
import { color, margins } from "../../design";
import { GeneralText } from "../atoms";
import { Die } from "../die";
import { DiceIconWrapper, ExtraDiceInfo, ExtraInfoSum } from "./styles";

interface DiceUpProps {
  diceAmount: number;
  diceValue?: number;
  faceColor?: string;
  pipColor?: string;
  diceSum?: number;
  extraDice?: number;
  isMatchSettings?: boolean;
  customcolor?: string;
}

export const DiceIcon: FC<DiceUpProps> = ({
  diceAmount,
  diceValue,
  faceColor,
  pipColor,
  diceSum,
  extraDice = 0,
  isMatchSettings,
  customcolor,
}) => {
  const totalDice = diceAmount - extraDice;

  return (
    <DiceIconWrapper>
      <Die value={diceValue} size={margins.small4} faceColor={faceColor} pipColor={pipColor} isMatchSettings={isMatchSettings} />
      <GeneralText transformText="none" customcolor={customcolor || color.darkGrey}>
        {text.param.xAmount(totalDice)}
      </GeneralText>
      {extraDice !== 0 && (
        <ExtraDiceInfo customcolor={color.darkGrey} transformText="none">
          <Highlighter
            highlightClassName="bold"
            searchWords={[String(extraDice)]}
            autoEscape
            textToHighlight={text.param.plusAmount(extraDice)}
          />
        </ExtraDiceInfo>
      )}
      {diceSum && (
        <ExtraInfoSum customcolor={color.darkGrey} transformText="none">
          <Highlighter
            highlightClassName="bold"
            searchWords={[String(diceSum)]}
            autoEscape
            textToHighlight={text.param.sumOfDice(diceSum)}
          />
        </ExtraInfoSum>
      )}
    </DiceIconWrapper>
  );
};
