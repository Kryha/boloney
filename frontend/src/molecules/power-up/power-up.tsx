import { FC } from "react";
import { LockIconSVG, text } from "../../assets";
import { CheckboxBox, RadioInput } from "../../atoms";
import { color, spacing } from "../../design";
import { PowerUp, PowerUpId } from "../../types";
import { Badge } from "../badges";
import { PrimaryButton } from "../buttons";
import { PowerUpHeading } from "../text/power-up-heading";
import { PowerUpButtonWrapper, PowerUpCardWrapper, PowerUpContent, PowerUpContentHover, PowerUpImage } from "./styles";

interface PowerUpCardProps {
  powerUp: PowerUp;
  isPowerUpDisabled?: boolean;
  isButtonDisabled?: boolean;
  isDetailShown?: boolean;
  powerUpKey: number;
  setDetailsShown?: (isDetailShown: boolean) => void;
  onClickButton?: (powerUp: PowerUp) => void;
  onClickRadio?: (powerUpKey: number) => void;
  onClickCheck?: (key: number, powerUpId: PowerUpId) => void;
}

/**
 * @param {PowerUp} powerUp - PowerUp that needs to be displayed on the card
 * @param {boolean} isPowerUpDisabled - Is true when the powerUp can't be used
 * @param {boolean} isButtonDisabled - Is true when the button can't be clicked
 * @param {boolean} areDetailsShown - will determine if the power-up description is shown
 * @param {number} powerUpKey - is the unique key value to identify the powerup card
 * @param {Function} setDetailsShown - Manipulate the areDetailsShown state
 * @param {Function} onClickButton - Provide the powerUp information for this component
 * @param {Function} onClickRadio - Provide the powerUpKey for this component
 * @param {Function} onClickCheck - Provide the powerUpKey and powerUpId for this component
 */

export const PowerUpCard: FC<PowerUpCardProps> = ({
  powerUp,
  isPowerUpDisabled = false,
  isButtonDisabled = false,
  isDetailShown = false,
  powerUpKey,
  setDetailsShown,
  onClickButton,
  onClickRadio,
  onClickCheck,
}) => {
  const isHoverEnabled = !!onClickCheck || !!onClickRadio;
  const descriptionText = isDetailShown ? powerUp.longDescription : text.param.zeroAmount(powerUp.id);

  const handleCardClick = () => {
    if (onClickCheck !== undefined) {
      onClickCheck(powerUpKey, powerUp.id);
    }
    if (onClickRadio !== undefined) {
      onClickRadio(powerUpKey);
    }
  };

  return (
    <PowerUpCardWrapper isHoverEnabled={isHoverEnabled} padding={spacing.s}>
      {isPowerUpDisabled && <Badge icon={<LockIconSVG />} text={text.playerTurn.availableNextRound} />}
      <PowerUpContent isHoverEnabled={isHoverEnabled} isImageHidden={isDetailShown} onClick={() => handleCardClick()}>
        <PowerUpImage src={powerUp.cardImage} alt={powerUp.name} isImageHidden={isDetailShown} />
        <PowerUpHeading
          powerUpName={powerUp.name}
          description={descriptionText}
          setDetailsShown={() => setDetailsShown && setDetailsShown(!isDetailShown)}
          isDetailShown={isDetailShown}
          headingColor={color.mediumGrey}
          exampleColor={color.darkGrey}
          exampleDescription={powerUp.exampleDescription}
          showDetailsText={isHoverEnabled}
        />
        {!!onClickRadio && <RadioInput type="checkbox" onChange={() => onClickRadio(powerUpKey)} />}
        {!!onClickCheck && (
          <CheckboxBox disabled={isButtonDisabled} type="checkbox" onChange={() => onClickCheck(powerUpKey, powerUp.id)} />
        )}
      </PowerUpContent>
      <PowerUpContentHover isHoverEnabled={isHoverEnabled} justifyContent="flex-end">
        <PowerUpHeading
          powerUpName={powerUp.name}
          description={powerUp.longDescription}
          headingColor={color.mediumGrey}
          exampleColor={color.darkGrey}
          exampleDescription={powerUp.exampleDescription}
        />
        {!!onClickButton && (
          <PowerUpButtonWrapper>
            <PrimaryButton disabled={isButtonDisabled} primaryText={text.powerUps.useIt} onClick={() => onClickButton(powerUp)} />
          </PowerUpButtonWrapper>
        )}
      </PowerUpContentHover>
    </PowerUpCardWrapper>
  );
};
