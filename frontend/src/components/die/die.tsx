import { FC, ReactNode } from "react";

import { FaceWrapper, PipContainer } from "./styles";

interface DieProps {
  value: number;
  faceSize?: string;
  pipSize?: string;
  faceColor?: string;
  pipColor?: string;
}

interface FaceProps {
  children: ReactNode;
}

interface PipProps {
  pipColor?: string;
  pipSize?: string;
}

export const Pip: FC<PipProps> = ({ pipColor, pipSize }) => <PipContainer pipColor={pipColor} pipSize={pipSize} />;

export const Face: FC<FaceProps> = ({ children }) => <Face>{children}</Face>;

export const Die: FC<DieProps> = ({ value, faceColor, faceSize, pipColor, pipSize }) => {
  const pips = Array(value)
    .fill(0)
    .map((_, index) => <Pip key={index} pipColor={pipColor} pipSize={pipSize} />);
  return (
    <FaceWrapper faceColor={faceColor} faceSize={faceSize}>
      {pips}
    </FaceWrapper>
  );
};
