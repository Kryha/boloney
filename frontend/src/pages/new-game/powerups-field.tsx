import { FC } from "react";
import { text } from "../../assets";
import { Checkbox, GeneralText, Heading6, InfoButton, Input } from "../../components";
import { PowerUpData } from "../../design/power-up";
import { useGameCreationFormState } from "./game-creation-form-state";
import {
  CheckboxContainer,
  FieldContainer,
  InfoBox,
  Percentage,
  PercentageContainer,
  TotalContainer,
  TrophyContainer,
  TrophyNewGame,
} from "./styles";

export const PowerupsField: FC = () => {
  const availablePowerups = useGameCreationFormState((state) => state.availablePowerups);
  const togglePowerup = useGameCreationFormState((state) => state.togglePowerup);
  const amountOfPowerUps = useGameCreationFormState((state) => state.amountOfPowerUps);
  const powerUpProbability = useGameCreationFormState((state) => state.powerUpProbability);
  const probability = powerUpProbability.reduce((a, b) => a + b.probability, 0);
  const setButtonDisabled = useGameCreationFormState((state) => state.setButtonDisabled);
  const isButtonDisabled = useGameCreationFormState((state) => state.isButtonDisabled);
  {
    /* {setButtonDisabled(probability > 100 && powerUpProbability.some((e) => e.name === data.name))} */
  }
  return (
    <FieldContainer>
      <Input label={text.newGame.whichPowerups}>
        <>
          <InfoBox>
            <GeneralText>{text.newGame.powerUpDesc}</GeneralText>
            <InfoButton text="chance" />
          </InfoBox>
          <CheckboxContainer>
            {PowerUpData.map((data, index) => (
              <Checkbox
                key={index}
                isTop
                title={data.name}
                description={data.shortDescription}
                isChecked={availablePowerups.includes(data.name)}
                toggleCheck={() => togglePowerup(data.name)}
                powerUp={{ name: data.name, image: data.iconImage }}
                isDisabled={
                  (amountOfPowerUps === 0 || amountOfPowerUps === availablePowerups.length) && !availablePowerups.includes(data.name)
                }
                name={data.name}
              />
            ))}
          </CheckboxContainer>
          <TotalContainer>
            <TrophyContainer>
              <TrophyNewGame />
              <Heading6>{text.newGame.total}</Heading6>
            </TrophyContainer>
            <PercentageContainer>
              <Percentage isError={isButtonDisabled}>{probability}</Percentage>
              <GeneralText>{text.newGame.outOfOneHundred}</GeneralText>
            </PercentageContainer>
          </TotalContainer>
        </>
      </Input>
    </FieldContainer>
  );
};
