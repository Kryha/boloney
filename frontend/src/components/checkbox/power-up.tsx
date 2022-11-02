import { FC } from "react";

import { useGameCreationFormState } from "../../pages/new-game/game-creation-form-state";
import { GeneralContentWrapper, Heading6, Row } from "../atoms";
import { CheckboxInput } from "../inputs";
import { PowerUpComponent } from "../power-up";

import { Description, DescriptionContainer, Lightning, PercentageInput, PercentageInputContainer } from "./styles";
import { PowerUpDataProps } from "../../assets";
import { PowerUpProbability, PowerUpType } from "../../types";

interface PowerUpsInfo {
  isUsingSwitchIcon?: boolean;
  powerUp: PowerUpDataProps;
  isChecked: boolean;
  isError: boolean;
  probability: number;
  setProbability: (probability: number) => void;
  setPowerUpValue: (name: PowerUpType, value: number) => void;
  powerUpValue: PowerUpProbability[];
}

export const PowerUpInfo: FC<PowerUpsInfo> = ({
  isUsingSwitchIcon,
  powerUp,
  isChecked,
  isError,
  probability,
  setProbability,
  powerUpValue,
  setPowerUpValue,
}) => {
  const setPowerUpProbability = useGameCreationFormState((state) => state.setPowerUpProbability);
  const value = useGameCreationFormState((state) => state.value);
  const powerUpProbability = useGameCreationFormState((state) => state.powerUpProbability);
  const powerUpData = { id: powerUp.id, image: powerUp.iconImage, name: powerUp.name };
  const proba = powerUpProbability.find((o) => o.id === powerUp.id);
  console.log("a", proba);
  const newProbability = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setPowerUpProbability({ id: powerUp.id, probability: Number(e.target.value) });
  };

  const updateProbability = (probability: number) => {
    if (probability > 100) {
      setProbability(100);
    } else if (probability < 0) {
      setProbability(0);
    } else {
      setProbability(probability);
    }
  };

  return (
    <>
      <PowerUpComponent powerUp={powerUpData} />
      <DescriptionContainer removeLeftBorder={isUsingSwitchIcon}>
        <GeneralContentWrapper>
          <Row>
            <Lightning />
            <Heading6>{powerUp.name}</Heading6>
          </Row>
          <Description>{powerUp.shortDescription}</Description>
        </GeneralContentWrapper>
      </DescriptionContainer>
      <CheckboxInput isError={isError}>
        <PercentageInputContainer onClick={(e) => e.stopPropagation()} isError={isError}>
          <PercentageInput
            type="number"
            onBlur={(e) => newProbability(e)}
            disabled={!isChecked}
            value={proba?.probability || probability}
            onChange={(e) => updateProbability(Number(e.target.value))}
          />
        </PercentageInputContainer>
      </CheckboxInput>
    </>
  );
};
