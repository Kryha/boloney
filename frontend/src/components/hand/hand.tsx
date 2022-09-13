import { FC } from "react";
import { SkeletonHand, SkeletonHandPaint } from "../../assets";

import { text } from "../../assets/text";
import { Heading4 } from "../atoms/text";
import { HandContainer, HandWrapper, Hand, Shadow, Paint } from "./styles";

export const Hands: FC = () => {
  return (
    <HandWrapper>
      <HandContainer>
        <Hand src={SkeletonHand} alt="hand" />
        <Paint src={SkeletonHandPaint} alt="paint" />
      </HandContainer>
      {/* <Shadow /> */}
    </HandWrapper>
  );
};
