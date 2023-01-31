import { FC } from "react";

import { useStore } from "../../store";
import { PowerUpResultView } from "../power-up-result-view";
import { ProceedWithPowerUp } from "./proceed-with-power-up";

/**
 * This component switches between the two views based on the power-up result.
 * Do not add extra logic to this component!
 */
export const UsePowerUp: FC = () => {
  const powerUpState = useStore((state) => state.powerUpState);

  if (!powerUpState.active) return <></>;

  return (
    <>
      {powerUpState.result ? (
        <PowerUpResultView result={powerUpState.result} />
      ) : (
        <ProceedWithPowerUp activePowerUp={powerUpState.active} targetPlayerId={powerUpState.targetPlayerId} />
      )}
    </>
  );
};
