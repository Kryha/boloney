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
            isChecked={availablePowerUps.includes("defection")}
            toggleCheck={() => togglePowerUp("defection")}
          />
          <Checkbox
            title={text.newGame.powerup2}
            description={text.newGame.powerup2Desc}
            isChecked={availablePowerUps.includes("diversion")}
            toggleCheck={() => togglePowerUp("diversion")}
          />
          <Checkbox
            title={text.newGame.powerup3}
            description={text.newGame.powerup3Desc}
            isChecked={availablePowerUps.includes("interrogate")}
            toggleCheck={() => togglePowerUp("interrogate")}
          />
          <Checkbox
            title={text.newGame.powerup4}
            description={text.newGame.powerup4Desc}
            isChecked={availablePowerUps.includes("reconnaissance")}
            toggleCheck={() => togglePowerUp("reconnaissance")}
          />
        </CheckboxContainer>
      </Input>
    </FieldContainer>
  );
};
