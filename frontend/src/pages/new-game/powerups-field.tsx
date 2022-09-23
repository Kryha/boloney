import { text } from "../../assets";
import { Checkbox, Input } from "../../components";
import { useNewGameState } from "./new-game-state";
import { FieldContainer } from "./styles";

export const PowerupsField = () => {
  const availablePowerups = useNewGameState((state) => state.availablePowerups);
  const togglePowerup = useNewGameState((state) => state.togglePowerup);

  return (
    <FieldContainer>
      <Input label={text.newGame.whichPowerups}>
        <Checkbox
          isTop
          title={text.newGame.powerup1}
          description={text.newGame.powerup1Desc}
          isChecked={availablePowerups.includes("p1")}
          toggleCheck={() => togglePowerup("p1")}
        />
        <Checkbox
          title={text.newGame.powerup2}
          description={text.newGame.powerup2Desc}
          isChecked={availablePowerups.includes("p2")}
          toggleCheck={() => togglePowerup("p2")}
        />
        <Checkbox
          title={text.newGame.powerup3}
          description={text.newGame.powerup3Desc}
          isChecked={availablePowerups.includes("p3")}
          toggleCheck={() => togglePowerup("p3")}
        />
        <Checkbox
          title={text.newGame.powerup4}
          description={text.newGame.powerup4Desc}
          isChecked={availablePowerups.includes("p4")}
          toggleCheck={() => togglePowerup("p4")}
        />
      </Input>
    </FieldContainer>
  );
};
