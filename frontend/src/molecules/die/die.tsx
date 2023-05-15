import { FC, ReactNode } from "react";
import {
  DiceFiveIconSVG,
  DiceFourIconSVG,
  DiceHiddenIconSVG,
  DiceOneIconSVG,
  DiceSixIconSVG,
  DiceThreeIconSVG,
  DiceTwoIconSVG,
} from "../../assets";
import { DiceIcon } from "../../atoms";

export const DiceIconRecord: Record<number, ReactNode> = {
  1: <DiceOneIconSVG />,
  2: <DiceTwoIconSVG />,
  3: <DiceThreeIconSVG />,
  4: <DiceFourIconSVG />,
  5: <DiceFiveIconSVG />,
  6: <DiceSixIconSVG />,
};

/**
 * Display a die with a given face value.
 * @param {string} size - will be used as width and height of the icon
 * @param {number} pipAmount - represents the amount of pips on the die if none is provided the die will be hidden
 * @param {string} dieColor - color of the die icon
 * @param {string} pipColor - color of the pips on the die icon
 * @param {string} radius -  border radius of the die icon
 * @param {string} borderColor - border color of the die icon
 * @param {boolean} isHidden - whether the die is hidden or not
 * @param {string} shadow - shadow of the die icon
 */

interface DiePops {
  size?: string;
  pipAmount?: number;
  dieColor?: string;
  pipColor?: string;
  radius?: string;
  borderColor?: string;
  isHidden?: boolean;
  shadow?: string;
}

export const Die: FC<DiePops> = ({ pipAmount, size, dieColor, pipColor, radius, borderColor, shadow }) => {
  const dieIcon = pipAmount ? DiceIconRecord[pipAmount] : <DiceHiddenIconSVG />;
  const isHidden = !pipAmount;

  return (
    <DiceIcon
      src={dieIcon}
      width={size}
      height={size}
      iconColor={dieColor}
      pipColor={pipColor}
      isDiceHidden={isHidden}
      radius={radius}
      borderColor={borderColor}
      shadow={shadow}
    />
  );
};
