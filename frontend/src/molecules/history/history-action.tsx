import { FC, ReactNode } from "react";
import { LightningIconSVG, text } from "../../assets";
import { BaseIcon, BaseRow, PlayerInfoText } from "../../atoms";
import { color, fontWeights, margins, spacing } from "../../design";
import { Die } from "../die";
import { RowHeadingIcon } from "../text";

interface Props {
  headingOne: string;
  headingOneColor?: string;
  headingTwo?: ReactNode;
  headingTwoColor?: string;
  isDice?: boolean;
  diceAmount?: number;
  powerUpAmount?: number;
  isPowerUp?: boolean;
  iconColor?: string;
}

/**
 * @description Molecule for history action title.
 * @param {headingOne} - First heading
 * @param {headingOneColor} - Color of first heading
 * @param {headingTwo} - Second heading
 * @param {headingTwoColor} - Color second heading
 * @param {isDice} - If there are any die present
 * @param {diceAmount} - Amount of dice
 * @param {isPowerUp} - If there are any power-ups present
 * @param {powerUpAmount} - Amount of power-ups
 * @param {iconColor} - Color of dice icon
 */

export const HistoryActionTitle: FC<Props> = ({
  headingOne,
  headingTwo,
  headingOneColor,
  headingTwoColor,
  isDice,
  powerUpAmount,
  diceAmount,
  isPowerUp,
  iconColor,
}) => {
  const textPowerUpAmount = powerUpAmount && powerUpAmount > 0 ? text.param.plusAmount(powerUpAmount) : powerUpAmount;

  return (
    <BaseRow alignItems="center" gap={spacing.xs}>
      <PlayerInfoText fontWeight={fontWeights.light} customcolor={headingOneColor}>
        {text.param.appendColon(headingOne)}
      </PlayerInfoText>
      {!isDice && !isPowerUp && (
        <PlayerInfoText fontWeight={fontWeights.light} customcolor={headingTwoColor}>
          {headingTwo}
        </PlayerInfoText>
      )}
      {isDice && (
        <RowHeadingIcon
          icon={<BaseIcon src={<Die dieColor={iconColor} />} iconColor={iconColor} />}
          heading={text.param.plusAmount(diceAmount || 0)}
          gap={margins.small1}
          headingFontWeight={fontWeights.light}
          headingColor={headingTwoColor}
          iconPosition="row-reverse"
          transformText="none"
        />
      )}
      {isPowerUp && (
        <RowHeadingIcon
          icon={<BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.mediumGrey} />}
          heading={textPowerUpAmount?.toString()}
          gap={margins.small0}
          headingFontWeight={fontWeights.light}
          headingColor={headingTwoColor}
          iconPosition="row-reverse"
          transformText="none"
        />
      )}
    </BaseRow>
  );
};
