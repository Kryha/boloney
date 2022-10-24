import { GameLayout } from "../../components";
import { fakeDiceRolls, fakePlayers } from "../../service";
import { fakePowerUps } from "../../service/fake-power-ups";

// TODO: finish page
export const Match = () => {
  return <GameLayout players={fakePlayers} dice={fakeDiceRolls} powerUps={fakePowerUps} />;
};
