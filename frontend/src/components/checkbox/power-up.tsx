import { FC, useState } from "react";
import { useGameCreationFormState } from "../../pages/new-game/game-creation-form-state";
import { GeneralContentWrapper, Heading6, Row } from "../atoms";
import { CheckboxInput } from "../inputs";
import { PowerUp } from "../power-up";

import { Description, DescriptionContainer, Lightning, PercentageInput } from "./styles";
import { PowerUpDataProps } from "../../assets";

interface PowerUpsInfo {
  isUsingSwitchIcon?: boolean;
  powerUp: PowerUpDataProps;
  isChecked: boolean;
}

export const PowerUpInfo: FC<PowerUpsInfo> = ({ isUsingSwitchIcon, powerUp, isChecked }) => {
  const setPowerUpProbability = useGameCreationFormState((state) => state.setPowerUpProbability);
  const powerUpProbability = useGameCreationFormState((state) => state.powerUpProbability);
  const removeProbability = useGameCreationFormState((state) => state.removeProbability);
  const probability = powerUpProbability.reduce((a, b) => a + b.probability, 0);
  const setButtonDisabled = useGameCreationFormState((state) => state.setButtonDisabled);
  const [value, setValue] = useState(0);

  const newProbability = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    // set the error for the game
    // removeProbability(name);
    // setPowerUpProbability({ id: name, probability: Number(e.target.value) });
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
      <CheckboxInput>
        <PercentageInput
          type="number"
          value={isChecked ? value : 0}
          onClick={(e) => e.stopPropagation()}
          onBlur={(e) => newProbability(e)}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </CheckboxInput>
    </>
  );
};
