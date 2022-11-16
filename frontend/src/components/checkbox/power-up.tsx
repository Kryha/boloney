import { FC } from "react";

import { GeneralContentWrapper, Heading6, Row } from "../atoms";
import { CheckboxInput } from "../inputs";
import { PowerUpComponent } from "../power-up";

import { Description, DescriptionContainer, Lightning, PercentageInput, PercentageInputContainer } from "./styles";
import { PowerUp } from "../../types";

interface PowerUpsInfo {
  isUsingSwitchIcon?: boolean;
  powerUp: PowerUp;
  isChecked: boolean;
  isError: boolean;
  probability: number;
  setProbability: (probability: number) => void;
}

export const PowerUpInfo: FC<PowerUpsInfo> = ({ isUsingSwitchIcon, powerUp, isChecked, isError, probability, setProbability }) => {
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
      <PowerUpComponent powerUp={powerUp} />
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
