import { FC } from "react";

import { LightningIconSVG, LockIconSVG, text } from "../../assets";
import { color, FontProps, margins } from "../../design";
import { BaseIcon, BaseRow, GeneralText } from "../../atoms";
import { PowerUpId } from "../../types";

interface PowerUpProps {
  powerUpAmount: number;
  powerUpIds?: PowerUpId[];
  isPowerUpDisabled?: boolean;
  fontSize?: FontProps;
  lineHeight?: FontProps;
  strokeColor?: string;
}

/**
 * Molecule for displaying power-up icon and amount and whether the power-up is disabled.
 * @param {powerUpAmount} - Amount of power-ups
 * @param {powerUpIds} - Array of power-up ids
 * @param {isPowerUpDisabled} - If power-up is disabled
 * @param {fontSize} - Font size
 * @param {lineHeight} - Line height
 * @param {strokeColor} - Stroke color
 */

export const PowerUpIcon: FC<PowerUpProps> = ({ powerUpAmount, isPowerUpDisabled = false, strokeColor, fontSize, lineHeight }) => {
  return (
    <BaseRow alignItems="center" gap={margins.small0}>
      <BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={strokeColor || color.darkGrey} />

      <GeneralText transformText="none" fontSize={fontSize} lineHeight={lineHeight} customcolor={strokeColor || color.darkGrey}>
        {text.param.xAmount(powerUpAmount)}
      </GeneralText>
      {isPowerUpDisabled && <BaseIcon src={<LockIconSVG />} />}
    </BaseRow>
  );
};
