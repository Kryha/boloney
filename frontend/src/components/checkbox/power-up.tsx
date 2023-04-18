import { FC } from "react";

import { GeneralContentWrapper, Row, Heading6, BodyText, PercentageInput, BaseIcon } from "../../atoms";
import { CheckboxInput } from "../inputs";
import { PowerUpComponent } from "../power-up";
import { color } from "../../design";
import { DescriptionContainer, PercentageInputContainer } from "./styles";
import { PowerUp } from "../../types";
import { LightningIconSVG } from "../../assets";
import { LightningContainer } from "../../pages/new-match/styles";

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
      <PowerUpComponent powerUp={powerUp} />
      <DescriptionContainer>
        <GeneralContentWrapper>
          <Row>
            <LightningContainer>
              <BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />
            </LightningContainer>
            <Heading6>{powerUp.name}</Heading6>
          </Row>
          <BodyText customcolor={color.darkGrey}>{powerUp.shortDescription}</BodyText>
        </GeneralContentWrapper>
      </DescriptionContainer>
      <CheckboxInput isError={isError}>
        <PercentageInputContainer onClick={(e) => e.stopPropagation()}>
          <PercentageInput
            type="text"
            disabled={!isChecked}
            placeholder="0"
            value={probability === 0 ? "" : probability}
            onChange={(e) => updateProbability(e.target.value)}
            error={isError}
          />
        </PercentageInputContainer>
      </CheckboxInput>
    </>
  );
};
