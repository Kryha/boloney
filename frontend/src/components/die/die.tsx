import { FC } from "react";
import { DiceFiveIcon, DiceFourIcon, DiceHiddenIcon, DiceOneIcon, DiceSixIcon, DiceThreeIcon, DiceTwoIcon } from "../../assets";

import { DieWrapper } from "./styles";

interface DieProps {
  value?: number;
  size?: string;
  faceColor?: string;
  pipColor?: string;
  padding?: string;
}

export const findDieFace = (value?: number) => {
  if (!value) return <DiceHiddenIcon />;

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

export const Die: FC<DieProps> = ({ value, faceColor, size, pipColor }) => {
  return (
    <DieWrapper faceColor={faceColor} size={size} pipColor={pipColor} isSixDie={value === 6}>
      {findDieFace(value)}
    </DieWrapper>
  );
};
