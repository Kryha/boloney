import { FC, useState } from "react";
import { PowerUp as PowerUpType, PowerupType } from "../../interfaces/game";
import { useGameCreationFormState } from "../../pages/new-game/game-creation-form-state";
import { GeneralContentWrapper, Heading6, Row } from "../atoms";
import { CheckboxInput } from "../inputs";
import { PowerUp } from "../power-up";

import { Description, DescriptionContainer, PercentageInput, Trophy } from "./styles";

interface PowerUpsInfo {
  description?: string;
  isUsingSwitchIcon?: boolean;
  powerUp: PowerUpType;
  name: PowerupType;
  isChecked: boolean;
}

export const PowerUpInfo: FC<PowerUpsInfo> = ({ description, isUsingSwitchIcon, powerUp, name, isChecked }) => {
  const setPowerUpProbability = useGameCreationFormState((state) => state.setPowerUpProbability);
  const powerUpProbability = useGameCreationFormState((state) => state.powerUpProbability);
  const removeProbability = useGameCreationFormState((state) => state.removeProbability);
  const probability = powerUpProbability.reduce((a, b) => a + b.probability, 0);
  const [value, setValue] = useState(0);

  const newProbability = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    removeProbability(name);
    setPowerUpProbability({ name: name, probability: Number(e.target.value) });
  };

  return (
    <>
      <PowerUp powerUp={powerUp} />
      <DescriptionContainer removeLeftBorder={isUsingSwitchIcon}>
        <GeneralContentWrapper>
          <Row>
            <Trophy />
            <Heading6>{name}</Heading6>
          </Row>
          {description && <Description>{description}</Description>}
        </GeneralContentWrapper>
      </DescriptionContainer>
      <CheckboxInput
        isError={
          (probability > 100 && powerUpProbability.some((e) => e.name === name)) || (powerUpProbability.length > 0 && probability < 100)
        }
      >
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
