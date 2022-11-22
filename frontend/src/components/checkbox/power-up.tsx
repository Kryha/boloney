import { FC } from "react";

import { CheckboxInput } from "../inputs";
import { PercentageInput, PercentageInputContainer } from "./styles";
import { PowerUp } from "../../types";
import { PowerUpDescription } from "../power-up-description";

interface PowerUpsInfo {
  powerUp: PowerUp;
  isChecked: boolean;
  isError: boolean;
  probability: number;
  setProbability: (probability: number) => void;
}

export const PowerUpInfo: FC<PowerUpsInfo> = ({ powerUp, isChecked, isError, probability, setProbability }) => {
  const updateProbability = (formValue: string) => {
    const parsed = Number(formValue);

    if (isNaN(parsed)) return;

    if (parsed > 100) {
      setProbability(100);
    } else if (parsed < 0) {
      setProbability(0);
    } else {
      setProbability(parsed);
    }
  };

  return (
    <>
      <PowerUpDescription powerUp={powerUp} hasLightningIcon />
      <CheckboxInput isError={isError}>
        <PercentageInputContainer onClick={(e) => e.stopPropagation()} isError={isError}>
          <PercentageInput
            type="text"
            disabled={!isChecked}
            placeholder="0"
            value={probability === 0 ? "" : probability}
            onChange={(e) => updateProbability(e.target.value)}
          />
        </PercentageInputContainer>
      </CheckboxInput>
    </>
  );
};
