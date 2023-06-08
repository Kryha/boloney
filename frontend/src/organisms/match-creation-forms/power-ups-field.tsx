import { FC } from "react";

import { LightningIconSVG, POWER_UP_DATA, text } from "../../assets";
import { BaseIcon, BaseRow, BodyText } from "../../atoms";

import { buttonSize, color, fontWeights, spacing } from "../../design";
import { Input, PowerUpCheckbox, RowHeadingIcon, TertiaryButton, Tooltip } from "../../molecules";
import { PowerUpId } from "../../types";
import { useMatchCreationFormState } from "./match-creation-form-state";
import { MatchCheckboxContainer, MatchFieldContainer, MatchInformationBox, MatchTotalContainer } from "./styles";

export const PowerUpsField: FC = () => {
  const availablePowerUps = useMatchCreationFormState((state) => state.availablePowerUps);
  const probabilities = useMatchCreationFormState((state) => state.powerUpProbability);
  const togglePowerUp = useMatchCreationFormState((state) => state.togglePowerUp);
  const setProbability = useMatchCreationFormState((state) => state.setPowerUpProbability);
  const totalProbability = useMatchCreationFormState((state) => state.getTotalProbability());
  const isPowerUpError = useMatchCreationFormState((state) => state.getIsError());
  const percentageColor = isPowerUpError ? color.red : color.black;

  const updateProbability = (formValue: string, id: PowerUpId) => {
    const parsed = Number(formValue);

    if (isNaN(parsed)) return;

    if (parsed > 100) {
      setProbability({ id, probability: 100 });
    } else if (parsed < 0) {
      setProbability({ id, probability: 0 });
    } else {
      setProbability({ id, probability: parsed });
    }
  };

  return (
    <MatchFieldContainer>
      <Input label={text.newMatch.whichPowerUps}>
        <MatchInformationBox>
          <BodyText>{text.newMatch.powerUpDesc}</BodyText>
          <BaseRow justifyContent="flex-end">
            <TertiaryButton
              text={text.newMatch.chance}
              icon={
                <Tooltip
                  title={text.general.toolTipPowerUpTypeTitle}
                  description={text.general.toolTipPowerUpTypeInfo}
                  infoPosition="right"
                />
              }
              padding={buttonSize.md}
            />
          </BaseRow>
        </MatchInformationBox>
        <MatchCheckboxContainer>
          {Object.values(POWER_UP_DATA).map((powerUp, index) => (
            <PowerUpCheckbox
              key={index}
              isTop
              isChecked={availablePowerUps.has(powerUp.id)}
              powerUp={powerUp}
              isError={isPowerUpError && availablePowerUps.has(powerUp.id)}
              probability={probabilities.get(powerUp.id)?.probability || 0}
              handleCheck={() => togglePowerUp(powerUp.id)}
              updateProbability={updateProbability}
            />
          ))}
        </MatchCheckboxContainer>
      </Input>
      <MatchTotalContainer justifyContent="flex-end" gap={spacing.sm}>
        <RowHeadingIcon
          headingFontWeight={fontWeights.regular}
          heading={text.newMatch.total}
          icon={<BaseIcon src={<LightningIconSVG />} iconColor={color.transparent} strokeColor={color.black} />}
          iconPosition="row-reverse"
          justifyContent="flex-end"
          gap={spacing.xxs}
          transformText="capitalize"
          headingColor={color.black}
        />
        <BaseRow alignItems="center">
          <BodyText fontWeight={fontWeights.bolder} customcolor={percentageColor}>
            {totalProbability}
          </BodyText>
          <BodyText>{text.newMatch.outOfOneHundred}</BodyText>
        </BaseRow>
      </MatchTotalContainer>
    </MatchFieldContainer>
  );
};
