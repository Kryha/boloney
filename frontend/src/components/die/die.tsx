import { FC } from "react";
import { findDieFace } from "../../util";

import { DieWrapper } from "./styles";

interface DieProps {
  value: number;
  faceSize?: string;
  pipSize?: string;
  faceColor?: string;
  pipColor?: string;
  padding?: string;
}

export const Die: FC<DieProps> = ({ value, faceColor, faceSize, pipColor }) => {
  return (
    <DieWrapper faceColor={faceColor} faceSize={faceSize} pipColor={pipColor} isSixDie={value === 6}>
      {findDieFace(value)}
    </DieWrapper>
  );
};
