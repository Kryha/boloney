import { FC } from "react";

import { FaceWrapper, PipContainer } from "./styles";

interface DieProps {
  value: number;
}

export const Pip = () => <PipContainer />;

export const Face: FC<FaceProps> = ({ children }) => <Face>{children}</Face>;

export const Die: FC<DieProps> = ({ value }) => {
  const pips = Array(value)
    .fill(0)
    .map((_, index) => <Pip key={index} />);
  return <FaceWrapper>{pips}</FaceWrapper>;
};

export default Die;
