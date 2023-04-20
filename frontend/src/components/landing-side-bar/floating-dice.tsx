import { FC } from "react";
import { WhiteDiceIconSVG } from "../../assets";
import { color, iconSize } from "../../design";
import { BaseIcon } from "../../atoms";

import { HandContainer, HandWrapper, ImageWrapper, Shadow } from "../hand/styles";

const diceProportions = {
  width: "clamp(90px, 11.46vw + -20px, 200px)",
  height: "clamp(40px, 5.21vw + -10px, 90px)",
  shadowSmallWidth: 2.5,
  shadowLargeWidth: 2.5,
};

interface FloatingDiceProps {
  speed: number;
  customcolor: string;
}

export const FloatingDice: FC<FloatingDiceProps> = ({ speed, customcolor }) => {
  return (
    <HandWrapper>
      <ImageWrapper width={diceProportions.width}>
        <HandContainer width={diceProportions.width} speed={speed}>
          <BaseIcon src={<WhiteDiceIconSVG />} pipColor={customcolor} width={iconSize.xl} height={iconSize.auto} iconColor={color.white} />
        </HandContainer>
        <Shadow smallWidth={diceProportions.shadowSmallWidth} largeWidth={diceProportions.shadowLargeWidth} speed={speed} />
      </ImageWrapper>
    </HandWrapper>
  );
};
