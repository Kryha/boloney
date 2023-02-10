import { FC } from "react";

import { HandContainer, HandWrapper, ImageWrapper, Shadow } from "../hand/styles";
import { WhiteDice } from "./styles";

const diceProportions = {
  width: "clamp(90px, 11.46vw + -20px, 200px)",
  height: "clamp(40px, 5.21vw + -10px, 90px)",
  shadowSmallWidth: 2.5,
  shadowLargeWidth: 2.5,
};

interface FloatingDiceProps {
  speed: number;
  customColor: string;
}

export const FloatingDice: FC<FloatingDiceProps> = ({ speed, customColor }) => {
  return (
    <HandWrapper>
      <ImageWrapper width={diceProportions.width} height={diceProportions.height} isInLobby>
        <HandContainer width={diceProportions.width} height={diceProportions.height} speed={speed} isInLobby>
          <WhiteDice customColor={customColor} />
        </HandContainer>
        <Shadow smallWidth={diceProportions.shadowSmallWidth} largeWidth={diceProportions.shadowLargeWidth} speed={speed} />
      </ImageWrapper>
    </HandWrapper>
  );
};
