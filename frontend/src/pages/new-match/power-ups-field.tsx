import { FC } from "react";

import { POWER_UP_DATA, text } from "../../assets";
import { GeneralText, Heading6, InfoButton, Input } from "../../components";
import { PowerUpCheckbox } from "../../components/checkbox/power-up-checkbox";
import { PowerUpId } from "../../types";
import { useMatchCreationFormState } from "./match-creation-form-state";
import {
  CheckboxContainer,
  FieldContainer,
  InfoBox,
  LightningContainer,
  LightningNewMatch,
  Percentage,
  PercentageContainer,
  TotalContainer,
} from "./styles";

export const PowerUpsField: FC = () => {
  const availablePowerUps = useMatchCreationFormState((state) => state.availablePowerUps);
  const probabilities = useMatchCreationFormState((state) => state.powerUpProbability);
  const togglePowerUp = useMatchCreationFormState((state) => state.togglePowerUp);
  const setProbability = useMatchCreationFormState((state) => state.setPowerUpProbability);
  const totalProbability = useMatchCreationFormState((state) => state.getTotalProbability());
  const isPowerUpError = useMatchCreationFormState((state) => state.getIsError());

  const isPowerUpAvailable = (powerUpId: PowerUpId) => {
    if (powerUpId === "5" || powerUpId === "9") return false;
    return true;
  };

  return (
    <FieldContainer>
      <Input label={text.newMatch.whichPowerUps}>
        <InfoBox>
          <GeneralText>{text.newMatch.powerUpDesc}</GeneralText>
          {/* TODO: add pop up info */}
          <InfoButton
            primaryText={text.newMatch.chance}
            tooltipTitle={text.general.toolTipPowerUpTypeTitle}
            tooltipInfo={text.general.toolTipPowerUpTypeInfo}
          />
        </InfoBox>
        <CheckboxContainer>
          {Object.values(POWER_UP_DATA)
            .filter((powerUp) => isPowerUpAvailable(powerUp.id))
            .map((powerUp, index) => (
              <PowerUpCheckbox
                key={index}
                isTop
                isChecked={availablePowerUps.has(powerUp.id)}
                toggleCheck={() => togglePowerUp(powerUp.id)}
                powerUp={powerUp}
                isError={isPowerUpError && availablePowerUps.has(powerUp.id)}
                probability={probabilities.get(powerUp.id)?.probability || 0}
                setProbability={(probability: number) => setProbability({ id: powerUp.id, probability })}
              />
            ))}
        </CheckboxContainer>
      </Input>
      <TotalContainer>
        <LightningContainer>
          <LightningNewMatch />
          <Heading6>{text.newMatch.total}</Heading6>
        </LightningContainer>
        <PercentageContainer>
          <Percentage isError={isPowerUpError}>{totalProbability}</Percentage>
          <GeneralText>{text.newMatch.outOfOneHundred}</GeneralText>
        </PercentageContainer>
      </TotalContainer>
    </FieldContainer>
  );
};
