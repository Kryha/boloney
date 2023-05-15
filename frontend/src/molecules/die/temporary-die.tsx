import { FC } from "react";
import { RefreshIconSVG } from "../../assets";
import { BaseIcon } from "../../atoms";
import { color, iconSize, radius as borderRadius } from "../../design";
import { Die } from "./die";
import { TemporaryDiceWrapper } from "./styles";

interface TemporaryDiceProps {
  pipAmount: number;
  size?: string;
  dieColor?: string;
  pipColor?: string;
  radius?: string;
  borderColor?: string;
  isHidden?: boolean;
  shadow?: string;
}

/**
 * @description Renders a temporary die
 * @param pipAmount - The amount of pips on the die if none is provided the die will be hidden
 * @param size - The size of the die
 * @param dieColor - The color of the die
 * @param pipColor - The color of the pips on the die
 * @param radius - The border radius of the die
 * @param borderColor - The border color of the die
 * @param isHidden - Whether the die is hidden or not
 * @param shadow - The shadow of the die
 */

export const TemporaryDice: FC<TemporaryDiceProps> = ({ pipAmount, size, dieColor, pipColor, radius, borderColor, isHidden, shadow }) => {
  return (
    <TemporaryDiceWrapper height={size} width={size}>
      <Die
        pipAmount={pipAmount}
        size={size}
        dieColor={dieColor}
        pipColor={pipColor}
        radius={radius}
        isHidden={isHidden}
        borderColor={borderColor}
        shadow={shadow}
      />
      <BaseIcon
        src={<RefreshIconSVG />}
        strokeColor={color.darkGrey}
        iconColor={color.cloudWhite}
        radius={borderRadius.xs}
        width={iconSize.smallerFluid}
        height={iconSize.smallerFluid}
      />
    </TemporaryDiceWrapper>
  );
};
