import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { useViewport } from "../../hooks";
import { PowerUp } from "../../types";
import { GeneralText, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import {
  ButtonWrapper,
  DescriptionText,
  PowerUpCardContainer,
  PowerUpCardWrapper,
  PowerUpImage,
  PowerUpInfoContainer,
  PowerUpInfoWrapper,
} from "./styles";

interface PowerUpCardProps {
  powerUp: PowerUp;
  onClick?: (powerUp: PowerUp) => void;
}

export const PowerUpCard: FC<PowerUpCardProps> = ({ powerUp, onClick }) => {
  const { width } = useViewport();

  return (
    <PowerUpCardWrapper width={width} isPowerUpInUse={!!onClick}>
      <PowerUpCardContainer>
        <PowerUpImage src={powerUp.cardImage} isImageLarge={powerUp.isImageLarge} />
        <PowerUpInfoWrapper>
          <PowerUpInfoContainer>
            <Heading2 customColor={color.mediumGrey}>{powerUp.name}</Heading2>
            <DescriptionText>{powerUp.longDescription}</DescriptionText>
            <GeneralText>{text.param.zeroAmount(powerUp.id)}</GeneralText>
          </PowerUpInfoContainer>
        </PowerUpInfoWrapper>
      </PowerUpCardContainer>
      {!!onClick && (
        <ButtonWrapper>
          <PrimaryButton primaryText={text.powerUps.boost} onClick={() => onClick(powerUp)} />
        </ButtonWrapper>
      )}
    </PowerUpCardWrapper>
  );
};
