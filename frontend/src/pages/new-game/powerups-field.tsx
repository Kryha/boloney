import { text } from "../../assets";
import { Checkbox, Input } from "../../components";
import { useGameCreationFormState } from "./game-creation-form-state";
import { CheckboxContainer, FieldContainer } from "./styles";

export const PowerUpsField = () => {
  const availablePowerUps = useGameCreationFormState((state) => state.availablePowerUps);
  const togglePowerUp = useGameCreationFormState((state) => state.togglePowerUp);

  // TODO: refractor and remove lower case powerup
  return (
    <FieldContainer>
      <Input label={text.newGame.whichPowerUps}>
        <CheckboxContainer>
          <Checkbox
            isTop
            title={text.newGame.powerup1}
            description={text.newGame.powerup1Desc}
            isChecked={availablePowerUps.includes("1")}
            toggleCheck={() => togglePowerUp("1")}
          />
          <Checkbox
            title={text.newGame.powerup2}
            description={text.newGame.powerup2Desc}
            isChecked={availablePowerUps.includes("2")}
            toggleCheck={() => togglePowerUp("2")}
          />
          <Checkbox
            title={text.newGame.powerup3}
            description={text.newGame.powerup3Desc}
            isChecked={availablePowerUps.includes("3")}
            toggleCheck={() => togglePowerUp("3")}
          />
          <Checkbox
            title={text.newGame.powerup4}
            description={text.newGame.powerup4Desc}
            isChecked={availablePowerUps.includes("4")}
            toggleCheck={() => togglePowerUp("4")}
          />
        </CheckboxContainer>
      </Input>
    </FieldContainer>
  );
};
