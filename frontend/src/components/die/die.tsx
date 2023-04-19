import { FC } from "react";
import {
  DiceFiveIconSVG,
  DiceFourIconSVG,
  DiceHiddenIconSVG,
  DiceOneIconSVG,
  DiceSixIconSVG,
  DiceThreeIconSVG,
  DiceTwoIconSVG,
  RefreshIconSVG,
} from "../../assets";
import { color, iconSize, radius as borderRadius } from "../../design";
import { BaseIcon, DiceIcon, DiceIconProps } from "../../atoms";

import { DiceContainer, DieWrapper, TemporaryDieIconWrapper } from "./styles";

// The size of the die has equal width and height.
interface DieProps {
  value?: number;
  size?: string;
  isRow?: boolean;
  isTemporaryDice?: boolean;
  isMatchSettings?: boolean;
  isMatchHistory?: boolean;
  iconColor?: string;
  cursor?: boolean;
  radius?: string;
  shadow?: string;
  pipColor?: string;
  borderColor?: string;
}

export const findDieFace = (value?: number, diceIcon?: DiceIconProps) => {
  switch (value) {
    case 1:
      return <DiceIcon src={<DiceOneIconSVG />} {...diceIcon} />;
    case 2:
      return <DiceIcon src={<DiceTwoIconSVG />} {...diceIcon} />;
    case 3:
      return <DiceIcon src={<DiceThreeIconSVG />} {...diceIcon} />;
    case 4:
      return <DiceIcon src={<DiceFourIconSVG />} {...diceIcon} />;
    case 5:
      return <DiceIcon src={<DiceFiveIconSVG />} {...diceIcon} />;
    case 6:
      return <DiceIcon src={<DiceSixIconSVG />} {...diceIcon} />;
    default:
      return <DiceIcon src={<DiceHiddenIconSVG />} {...diceIcon} />;
  }
};

export const Die: FC<DieProps> = ({ value, iconColor, size, pipColor, isRow, isTemporaryDice, shadow, cursor, radius, borderColor }) => {
  const diceSize = isRow ? iconSize.md : size;

  return (
    <DiceContainer>
      <DieWrapper>
        {findDieFace(value, {
          width: diceSize,
          height: diceSize,
          iconColor: iconColor,
          pipColor: pipColor,
          shadow: shadow,
          cursor: cursor,
          radius: radius,
          isDiceHidden: !value,
          borderColor: borderColor,
        })}
      </DieWrapper>
      <TemporaryDieIconWrapper isRow={isRow}>
        {isTemporaryDice && (
          <BaseIcon
            src={<RefreshIconSVG />}
            strokeColor={color.darkGrey}
            iconColor={color.cloudWhite}
            radius={borderRadius.xs}
            width={iconSize.sm}
            height={iconSize.sm}
          />
        )}
      </TemporaryDieIconWrapper>
    </DiceContainer>
  );
};
