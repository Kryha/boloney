import { GameLayout } from "../../components";
import { DiceRolls, Players } from "../../service";
import { FakePowerUps } from "../../service/fake-power-ups";

// TODO: finish page
export const Match = () => {
  return <GameLayout players={Players} dice={DiceRolls} powerUp={FakePowerUps} />;
};
