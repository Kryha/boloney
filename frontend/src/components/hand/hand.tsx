import { FC } from "react";
import { SkeletonHand, SkeletonHandPaint } from "../../assets";

import { text } from "../../assets/text";
import { handSize } from "../../design/hand";
import { Heading4 } from "../atoms/text";
import { HandContainer, HandWrapper, Hand, Shadow, Paint } from "./styles";

interface HandProps {
  avatar: string;
  paint: string;
  avatarName: string;
  name: string;
  width?: number;
  height?: number;
}
// TODO: add other things
export const Hands: FC<HandProps> = ({ avatar, paint, avatarName, name, width = 4, height = 8 }) => {
  const proportions = handSize(avatarName);

  return (
    <HandWrapper>
      <HandContainer width={proportions.width} height={proportions.height} speed={proportions.speed}>
        <Hand src={avatar} alt={name} />
        <Paint src={paint} alt={name} />
      </HandContainer>
      <Shadow smallWidth={proportions.shadowSmallWidth} largeWidth={proportions.shadowLargeWidth} speed={proportions.speed} />
    </HandWrapper>
  );
};
