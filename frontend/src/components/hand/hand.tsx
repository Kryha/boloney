import { FC } from "react";

import { handSize } from "../../design/hand";
import { HandContainer, HandWrapper, Hand, Shadow, Paint } from "./styles";

interface HandProps {
  avatar: string;
  paint: string;
  avatarName: string;
  name: string;
}

export const Hands: FC<HandProps> = ({ avatar, paint, avatarName, name }) => {
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
