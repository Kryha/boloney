import { FC } from "react";
import { text } from "../../assets";
import { BaseRow, GeneralText } from "../../atoms";
import { dieSelectorGridTemplateColumns, dieSizes, spacing } from "../../design";
import { Die } from "../../types";
import { Die as DieIcon } from "./die";
import { DiceGridWrapper, DieWrapper } from "./styles";
import { TemporaryDice } from "./temporary-die";

interface DiceRowProps {
  dice: Die[];
  dieColor: string;
  temporaryDieAmount: number;
}

/**
 * @description Renders a row of dice
 * @param dice - The dice to render
 * @param dieColor - The color of the dice
 * @param temporaryDieAmount - The amount of temporary dice to render
 
 */

export const DiceRow: FC<DiceRowProps> = ({ dice, dieColor, temporaryDieAmount }) => {
  const isTemporaryDice = (index: number): boolean => {
    const firstTemporaryDieIndex = dice.length - temporaryDieAmount;
    return temporaryDieAmount !== 0 && index >= firstTemporaryDieIndex;
  };

  const isDoubleRow = dice.length > 7;

  const dieSize = isDoubleRow ? dieSizes.hudDoubleRow : dieSizes.hudSingleRow;

  return (
    <BaseRow alignItems="center" justifyContent="center">
      <GeneralText transformText="none">{text.param.xAmount(dice.length)}</GeneralText>
      <DiceGridWrapper gap={spacing.xxs} gridTemplateColumns={dieSelectorGridTemplateColumns.hudView}>
        {dice.map((die, index) => (
          <DieWrapper key={index}>
            {isTemporaryDice(index) ? (
              <TemporaryDice key={index} size={dieSize} dieColor={dieColor} pipAmount={die.rolledValue} />
            ) : (
              <DieIcon key={index} size={dieSize} dieColor={dieColor} pipAmount={die.rolledValue} />
            )}
          </DieWrapper>
        ))}
      </DiceGridWrapper>
    </BaseRow>
  );
};
