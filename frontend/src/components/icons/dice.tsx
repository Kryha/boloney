import { FC } from "react";
import Highlighter from "react-highlight-words";
import { text } from "../../assets";
import { color, iconSize } from "../../design";
import { DiceIconProps, GeneralText } from "../../atoms";
import { Die } from "../die";
import { DiceIconWrapper, ExtraDiceInfo, ExtraInfoSum } from "./styles";

interface DiceUpProps extends DiceIconProps {
  diceAmount: number;
  diceValue?: number;
  diceSum?: number;
  extraDice?: number;
  isMatchSettings?: boolean;
  customcolor?: string;
}

export const DiceIcon: FC<DiceUpProps> = ({
  diceAmount,
  diceValue,
  iconColor,
  pipColor,
  diceSum,
  extraDice = 0,
  isMatchSettings,
  customcolor,
  shadow,
  cursor,
  radius,
  width,
}) => {
  const totalDice = diceAmount - extraDice;
  const diceWidth = width ?? iconSize.xxs;

  return (
    <DiceIconWrapper>
      <Die
        value={diceValue}
        size={diceWidth}
        iconColor={iconColor}
        pipColor={pipColor}
        shadow={shadow}
        cursor={cursor}
        radius={radius}
        isMatchSettings={isMatchSettings}
      />
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
