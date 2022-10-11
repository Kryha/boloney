import { FC } from "react";
import { UseFormGetValues } from "react-hook-form";
import { text } from "../../assets";
import { Checkbox, GeneralText, Heading6, InfoButton, Input, PowerUp, Row } from "../../components";
import { InputLabel, LabelContainer } from "../../components/inputs/styles";
import { PowerUpData } from "../../design/power-up";
import { FakePowerUps } from "../../service/fake-power-ups";
import { useGameCreationFormState } from "./game-creation-form-state";
import { Fields } from "./new-game-creation";
import {
  CheckboxContainer,
  FieldContainer,
  InfoBox,
  Percentage,
  PercentageContainer,
  PercentageInput,
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

  return (
    <FieldContainer>
      <Input label={text.newGame.whichPowerups}>
        <>
          <InfoBox>
            <GeneralText>
              {
                "Select the type of power-ups you want to put on the table. In every match, you have a % of chance to get a certain power-up. You can change this % as you wish, just keep in mind that the total must sum 100%!"
              }
            </GeneralText>
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
                isPowerUpError={probability > 100 && powerUpProbability.some((e) => e.name === data.name)}
              />
            ))}
          </CheckboxContainer>
          <TotalContainer>
            <TrophyContainer>
              <TrophyNewGame />
              <Heading6>{text.newGame.total}</Heading6>
            </TrophyContainer>
            <PercentageContainer>
              <Percentage>{probability}</Percentage>
              <GeneralText>{text.newGame.outOfOneHundred}</GeneralText>
            </PercentageContainer>
          </TotalContainer>
        </>
      </Input>
    </FieldContainer>
  );
};
