import { FC } from "react";
import { DiceFiveIcon, DiceFourIcon, DiceHiddenIcon, DiceOneIcon, DiceSixIcon, DiceThreeIcon, DiceTwoIcon } from "../../assets";
import { LARGE_DIE_SIZE } from "../../constants";

import { DieWrapper } from "./styles";

interface DieProps {
  value?: number;
  size?: string;
  faceColor?: string;
  pipColor?: string;
  isRow?: boolean;
  isMatchSettings?: boolean;
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

export const Die: FC<DieProps> = ({ value, faceColor, size, pipColor, isRow, isMatchSettings }) => {
  const diceSize = isRow ? LARGE_DIE_SIZE : size;

  return (
    <DieWrapper faceColor={faceColor} size={diceSize} pipColor={pipColor} isDiceHidden={!value} isMatchSettings={isMatchSettings}>
      {findDieFace(value)}
    </DieWrapper>
  );
};
