import { FC } from "react";
import {
  DiceFiveIcon,
  DiceFourIcon,
  DiceHiddenIcon,
  DiceOneIcon,
  DiceSixIcon,
  DiceThreeIcon,
  DiceTwoIcon,
  RefreshIcon,
} from "../../assets";
import { LARGE_DIE_SIZE } from "../../constants";

import { DiceContainer, DieWrapper, TemporaryDieIconWrapper } from "./styles";

interface DieProps {
  value?: number;
  size?: string;
  faceColor?: string;
  pipColor?: string;
  isRow?: boolean;
  isTemporaryDice?: boolean;
  isMatchSettings?: boolean;
  isMatchHistory?: boolean;
}

export const findDieFace = (value?: number) => {
  switch (value) {
    case 1:
      return <DiceOneIcon />;
    case 2:
      return <DiceTwoIcon />;
    case 3:
      return <DiceThreeIcon />;
    case 4:
      return <DiceFourIcon />;
    case 5:
      return <DiceFiveIcon />;
    case 6:
      return <DiceSixIcon />;
    default:
      return <DiceHiddenIcon />;
  }
};

export const Die: FC<DieProps> = ({ value, faceColor, size, pipColor, isRow, isTemporaryDice, isMatchSettings, isMatchHistory }) => {
  const diceSize = isRow ? LARGE_DIE_SIZE : size;

  return (
    <DiceContainer>
      <DieWrapper
        faceColor={faceColor}
        size={diceSize}
        pipColor={pipColor}
        isDiceHidden={!value}
        isMatchSettings={isMatchSettings}
        isMatchHistory={isMatchHistory}
      >
        {findDieFace(value)}
      </DieWrapper>
      <TemporaryDieIconWrapper isRow={isRow}>{isTemporaryDice && <RefreshIcon />}</TemporaryDieIconWrapper>
    </DiceContainer>
  );
};
