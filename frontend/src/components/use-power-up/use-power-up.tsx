import { FC } from "react";

import { useStore } from "../../store";
import { PrimaryButton } from "../buttons";

// TODO: implement correct behaviour
export const UsePowerUp: FC = () => {
  const reset = useStore((state) => state.resetPowerUpState);
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);

  return (
    <PrimaryButton
      onClick={() => {
        setTurnActionStep("pickAction");
        reset();
      }}
      primaryText="Reset"
    />
  );
};
