import { FC } from "react";
import { useMatch } from "../../service";

import { useStore } from "../../store";
import { PowerUpResultView } from "../power-up-result-view";
import { ProceedWithPowerUp } from "./proceed-with-power-up";

// TODO: implement correct behaviour
export const UsePowerUp: FC = () => {
  const powerUpState = useStore((state) => state.powerUpState);
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);

  const { broadcastUsePowerUp } = useMatch();

  const proceedWithPowerUp = () => {
    setTurnActionStep("results");
    broadcastUsePowerUp();
  };

  if (!powerUpState.active) return <></>;

  return (
    <>
      {powerUpState.result ? (
        <PowerUpResultView result={powerUpState.result} />
      ) : (
        <ProceedWithPowerUp
          activePowerUp={powerUpState.active}
          targetPlayerId={powerUpState.targetPlayerId}
          onClick={() => proceedWithPowerUp()}
        />
      )}
    </>
  );
};
