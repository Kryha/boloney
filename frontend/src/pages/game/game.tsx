import { FC } from "react";
import { GameLayout } from "../../components";
import { Players } from "../../service/fake-players";

export const Game: FC = () => {
  return (
    <GameLayout
      players={Players}
      dice={[{ rolledValue: 1 }, { rolledValue: 2 }, { rolledValue: 3 }, { rolledValue: 4 }, { rolledValue: 5 }, { rolledValue: 6 }]}
    />
  );
};
