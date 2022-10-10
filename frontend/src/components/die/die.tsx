import { FC } from "react";
import { DiceFiveIcon, DiceFourIcon, DiceOneIcon, DiceSixIcon, DiceThreeIcon, DiceTwoIcon } from "../../assets";

import { DieWrapper } from "./styles";

interface DieProps {
  value: number;
  faceSize?: string;
  pipSize?: string;
  faceColor?: string;
  pipColor?: string;
  padding?: string;
}

export const findDie = (value: number) => {
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
      return <DiceOneIcon />;
  }
};

export const Die: FC<DieProps> = ({ value, faceColor, faceSize, pipColor }) => {
  return (
    <DieWrapper faceColor={faceColor} faceSize={faceSize} pipColor={pipColor} isSixDie={value === 6}>
      {findDie(value)}
    </DieWrapper>
  );
};
