import { FC } from "react";

import { Heading6, BodyText, PercentageInput, BaseIcon, BaseRow } from "../../atoms";
import { CheckboxInput } from "../inputs";
import { color, spacing } from "../../design";
import { DescriptionContainer, FormContentWrapper, PercentageInputContainer } from "./styles";
import { PowerUp, PowerUpId } from "../../types";
import { LightningIconSVG, text } from "../../assets";
import { PowerUpSmall } from "../power-up";

interface PowerUpsInfo {
  powerUp: PowerUp;
  isChecked: boolean;
  isError: boolean;
  probability: number;
  updateProbability: (formValue: string, id: PowerUpId) => void;
}

/**
 * @description A component that renders a power up
 * @param {PowerUp} powerUp - The power up
 * @param {boolean} isChecked - Whether the power up is checked
 * @param {boolean} isError - Whether the power up has an error
 * @param {number} probability - The probability of the power up
 * @param {updateProbability} updateProbability - The function to update the probability
 */

export const PowerUpInfo: FC<PowerUpsInfo> = ({ powerUp, isChecked, isError, probability, updateProbability }) => {
  return (
    <>
      <PowerUpSmall powerUpName={powerUp.name} powerUpImage={powerUp.cardImage} />
      <DescriptionContainer>
        <FormContentWrapper>
          <BaseRow gap={spacing.xxs}>
            <BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />
            <Heading6>{powerUp.name}</Heading6>
          </BaseRow>
          <BodyText customcolor={color.darkGrey}>{powerUp.shortDescription}</BodyText>
        </FormContentWrapper>
      </DescriptionContainer>
      <CheckboxInput isError={isError} errorMessage={text.newMatch.invalidPercentage}>
        <PercentageInputContainer onClick={(e) => e.stopPropagation()}>
          <PercentageInput
            type="text"
            disabled={!isChecked}
            placeholder="0"
            value={probability === 0 ? "" : probability}
            onChange={(e) => updateProbability(e.target.value, powerUp.id)}
            error={isError}
          />
        </PercentageInputContainer>
      </CheckboxInput>
    </>
  );
};
