import { FC } from "react";

import { handProportion } from "../../design";
import { HandContainer, HandWrapper, HandImage, Shadow, Paint, ImageWrapper } from "./styles";

interface HandProps {
  avatarName: string;
  name?: string;
  isAnimationDisabled?: boolean;
  isLeaderboard?: boolean;
  isTargetable?: boolean;
  height?: string;
  width?: string;
}

export const Hand: FC<HandProps> = ({ avatarName, name, isAnimationDisabled = false, isTargetable, height, width, isLeaderboard }) => {
  const hand = handProportion(avatarName);
  const handWidth = width ?? hand.width;

  return (
    <HandWrapper isTargetable={isTargetable}>
      <ImageWrapper width={handWidth} height={height}>
        <HandContainer
          width={handWidth}
          height={height}
          speed={hand.speed}
          isAnimationDisabled={isAnimationDisabled}
          isLeaderboard={isLeaderboard}
        >
          <HandImage src={hand.avatar} alt={name} />
          <Paint src={hand.paint} alt={name} />
        </HandContainer>
        {!isAnimationDisabled && <Shadow smallWidth={hand.shadowSmallWidth} largeWidth={hand.shadowLargeWidth} speed={hand.speed} />}
      </ImageWrapper>
    </HandWrapper>
  );
};
