import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { useViewport } from "../../hooks";
import { PowerUp } from "../../types";
import { getDescriptionExample } from "../../util";
import { Heading2 } from "../atoms";
import { PowerUpBadge } from "../badges";
import { PrimaryButton } from "../buttons";
import { RadioButton } from "../power-up-checkbox";
import {
  ButtonWrapper,
  DescriptionExample,
  DescriptionText,
  PowerUpCardContainer,
  PowerUpCardWrapper,
  PowerUpImage,
  PowerUpInfoContainer,
  PowerUpInfoWrapper,
  RadioButtonWrapper,
} from "./styles";

interface PowerUpCardProps {
  powerUp: PowerUp;
  onClickUse?: (powerUp: PowerUp) => void;
  onClickSelect?: (powerUpIndex?: number) => void;
  isButtonDisabled?: boolean;
  isSelected?: boolean;
  powerUpIndex?: number;
}

export const PowerUpCard: FC<PowerUpCardProps> = ({
  powerUp,
  onClickSelect,
  onClickUse,
  isButtonDisabled: isDisabled,
  isSelected = false,
  powerUpIndex,
}) => {
  const { width } = useViewport();
  const descriptionExample = getDescriptionExample(powerUp);

  return (
    <PowerUpCardWrapper width={width} isPowerUpInUse={!!onClickUse} canSelectPowerUp={!!onClickSelect}>
      {isDisabled && <PowerUpBadge />}
      <PowerUpCardContainer>
        <PowerUpImage src={powerUp.cardImage} isImageLarge={powerUp.isImageLarge} />
        <PowerUpInfoWrapper>
          <PowerUpInfoContainer>
            <Heading2 customColor={color.mediumGrey}>{powerUp.name}</Heading2>
            <DescriptionText>{powerUp.longDescription}</DescriptionText>
            {descriptionExample && <DescriptionExample>{descriptionExample}</DescriptionExample>}
          </PowerUpInfoContainer>
        </PowerUpInfoWrapper>
      </PowerUpCardContainer>
      {!!onClickUse && (
        <ButtonWrapper>
          <PrimaryButton disabled={isDisabled} primaryText={text.powerUps.useIt} onClick={() => onClickUse(powerUp)} />
        </ButtonWrapper>
      )}
      {!!onClickSelect && (
        <RadioButtonWrapper>
          <RadioButton isChecked={isSelected} isInPowerUp onSelect={() => onClickSelect(powerUpIndex)} />
        </RadioButtonWrapper>
      )}
    </PowerUpCardWrapper>
  );
};
