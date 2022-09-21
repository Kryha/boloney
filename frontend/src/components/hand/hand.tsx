import { FC } from "react";

import { handProportion } from "../../design/hand";
import { HandContainer, HandWrapper, Hand as HandImg, Shadow, Paint } from "./styles";

interface HandProps {
  avatar: string;
  paint: string;
  avatarName: string;
  name?: string;
}

export const Hand: FC<HandProps> = ({ avatar, paint, avatarName, name = "" }) => {
  const hand = handProportion(avatarName);

  return (
    <HandWrapper>
      <HandContainer width={hand.width} height={hand.height} speed={hand.speed}>
        <HandImg src={avatar} alt={name} />
        <Paint src={paint} alt={name} />
      </HandContainer>
      <Shadow smallWidth={hand.shadowSmallWidth} largeWidth={hand.shadowLargeWidth} speed={hand.speed} />
    </HandWrapper>
  );
};
