import { FC } from "react";
import { POWER_UP_DATA, text } from "../../assets";
import { GeneralText, Heading6, InfoButton, Input } from "../../components";
import { PowerUpCheckbox } from "../../components/checkbox/power-up-checkbox";
import { useGameCreationFormState } from "./game-creation-form-state";
import {
  CheckboxContainer,
  FieldContainer,
  InfoBox,
  LightningContainer,
  LightningNewGame,
  Percentage,
  PercentageContainer,
  TotalContainer,
} from "./styles";

export const PowerUpsField: FC = () => {
  const availablePowerUps = useGameCreationFormState((state) => state.availablePowerUps);
  const togglePowerUp = useGameCreationFormState((state) => state.togglePowerUp);
  const probability = useGameCreationFormState((state) => state.probability);
  const isPowerUpError = useGameCreationFormState((state) => state.isPowerUpError);

  return (
    <FieldContainer>
      <Input label={text.newGame.whichPowerUps}>
        <InfoBox>
          <GeneralText>{text.newGame.powerUpDesc}</GeneralText>
          {/* TODO: add pop up info */}
          <InfoButton text={text.newGame.chance} />
        </InfoBox>
        <CheckboxContainer>
          {POWER_UP_DATA.map((powerUp, index) => (
            <PowerUpCheckbox
              key={index}
              isTop
              isChecked={availablePowerUps.includes(powerUp.id)}
              toggleCheck={() => togglePowerUp(powerUp.id)}
              powerUp={powerUp}
              isError={isPowerUpError && availablePowerUps.includes(powerUp.id)}
            />
          ))}
        </CheckboxContainer>
      </Input>
      <TotalContainer>
        <LightningContainer>
          <LightningNewGame />
          <Heading6>{text.newGame.total}</Heading6>
        </LightningContainer>
        <PercentageContainer>
          <Percentage isError={isPowerUpError}>{probability}</Percentage>
          <GeneralText>{text.newGame.outOfOneHundred}</GeneralText>
        </PercentageContainer>
      </TotalContainer>
    </FieldContainer>
  );
};
