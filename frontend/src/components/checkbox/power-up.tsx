import { FC } from "react";

import { useGameCreationFormState } from "../../pages/new-game/game-creation-form-state";
import { GeneralContentWrapper, Heading6, Row } from "../atoms";
import { CheckboxInput } from "../inputs";
import { PowerUpComponent } from "../power-up";

import { Description, DescriptionContainer, Lightning, PercentageInput, PercentageInputContainer } from "./styles";
import { PowerUpDataProps } from "../../assets";
import { PowerUp } from "../../types";

interface PowerUpsInfo {
  isUsingSwitchIcon?: boolean;
  powerUp: PowerUpDataProps;
  isChecked: boolean;
  isError: boolean;
  probability: number;
  setProbability: (probability: number) => void;
}

export const PowerUpInfo: FC<PowerUpsInfo> = ({ isUsingSwitchIcon, powerUp, isChecked, isError, probability, setProbability }) => {
  const setPowerUpProbability = useGameCreationFormState((state) => state.setPowerUpProbability);
  const powerUpData: PowerUp = { id: powerUp.id, image: powerUp.iconImage, name: powerUp.name };

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
            value={probability}
            onChange={(e) => updateProbability(Number(e.target.value))}
          />
        </PercentageInputContainer>
      </CheckboxInput>
    </>
  );
};
