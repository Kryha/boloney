import { FC } from "react";

import { handProportion } from "../../design/hand";
import { HandContainer, HandWrapper, Hand as HandImg, Shadow, Paint, ImageWrapper } from "./styles";

interface HandProps {
  avatarName: string;
  name?: string;
  isInLobby?: boolean;
}

export const Hand: FC<HandProps> = ({ avatarName, name, isInLobby = false }) => {
  const hand = handProportion(avatarName);

  return (
    <HandWrapper>
      <ImageWrapper width={hand.width} height={hand.height} isInLobby={isInLobby}>
        <HandContainer width={hand.width} height={hand.height} speed={hand.speed} isInLobby={isInLobby}>
          <HandImg src={hand.avatar} alt={name} />
          <Paint src={hand.paint} alt={name} />
        </HandContainer>
        <Shadow smallWidth={hand.shadowSmallWidth} largeWidth={hand.shadowLargeWidth} speed={hand.speed} />
      </ImageWrapper>
    </HandWrapper>
  );
};
