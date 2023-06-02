import { FC } from "react";
import Highlighter from "react-highlight-words";
import { text } from "../../assets";
import { color, fontSizes, fontWeights, margins } from "../../design";
import { BaseRow, DiceIconProps, GeneralText } from "../../atoms";
import { Die } from "../die";
import { RowHeadingIcon } from "../text";

interface DiceUpProps extends DiceIconProps {
  diceAmount: number;
  diceSum?: number;
  extraDice?: number;
  customcolor?: string;
}

/**
 *  Molecule for displaying dice icon with amount of dice and extraDiceInfo if needed.
 * @param {diceAmount} - Amount of dice
 * @param {diceSum} - Sum of dice
 * @param {extraDice} - Amount of extra dice
 * @param {customcolor} - Custom color
 */

export const DiceIcon: FC<DiceUpProps> = ({ diceAmount, iconColor, diceSum, extraDice = 0, customcolor, pipColor }) => {
  const totalDice = diceAmount - extraDice;
  return (
    <BaseRow alignItems="center" gap={margins.small0}>
      <RowHeadingIcon
        icon={<Die dieColor={iconColor} pipColor={pipColor} borderColor={pipColor} />}
        heading={text.param.xAmount(totalDice)}
        gap={margins.small1}
        headingFontWeight={fontWeights.light}
        headingFontSize={fontSizes.generalText}
        headingColor={customcolor || color.darkGrey}
        iconPosition="row-reverse"
        transformText="none"
      />
      {extraDice !== 0 && (
        <GeneralText customcolor={color.darkGrey} transformText="none">
          <Highlighter
            highlightClassName="bold"
            searchWords={[String(extraDice)]}
            autoEscape
            textToHighlight={text.param.plusAmount(extraDice)}
          />
        </GeneralText>
      )}
      {diceSum && (
        <GeneralText customcolor={color.darkGrey} transformText="none">
          <Highlighter
            highlightClassName="bold"
            searchWords={[String(diceSum)]}
            autoEscape
            textToHighlight={text.param.sumOfDice(diceSum)}
          />
        </GeneralText>
      )}
    </BaseRow>
  );
};
