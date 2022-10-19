import { FC, useState } from "react";
import { useGameCreationFormState } from "../../pages/new-game/game-creation-form-state";
import { GeneralContentWrapper, Heading6, Row } from "../atoms";
import { CheckboxInput } from "../inputs";
import { PowerUp } from "../power-up";

import { Description, DescriptionContainer, Lightning, PercentageInput, PercentageInputContainer } from "./styles";
import { PowerUpDataProps } from "../../assets";

interface PowerUpsInfo {
  isUsingSwitchIcon?: boolean;
  powerUp: PowerUpDataProps;
  isChecked: boolean;
  isError: boolean;
}

export const PowerUpInfo: FC<PowerUpsInfo> = ({ isUsingSwitchIcon, powerUp, isChecked, isError }) => {
  const setPowerUpProbability = useGameCreationFormState((state) => state.setPowerUpProbability);

  const [value, setValue] = useState(0);

  const newProbability = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    // set the error for the game
    // removeProbability(name);
    setPowerUpProbability({ id: powerUp.id, probability: Number(e.target.value) });
  };

  return (
    <>
      <PowerUp powerUp={{ id: powerUp.id, image: powerUp.iconImage, name: powerUp.name }} />
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
        <PercentageInputContainer onClick={(e) => e.stopPropagation()} isChecked={isChecked}>
          <PercentageInput
            type="number"
            onBlur={(e) => newProbability(e)}
            onChange={(e) => setValue(Number(e.target.value))}
            disabled={!isChecked}
          />
        </PercentageInputContainer>
      </CheckboxInput>
    </>
  );
};
