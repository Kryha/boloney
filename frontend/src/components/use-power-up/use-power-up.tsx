import { FC } from "react";

import { useMatch } from "../../service";
import { useStore } from "../../store";
import { PrimaryButton } from "../buttons";
import { PowerUpResultView } from "../power-up-result-view";

// TODO: implement correct behaviour
export const UsePowerUp: FC = () => {
  const reset = useStore((state) => state.resetPowerUpState);
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const powerUpState = useStore((state) => state.powerUpState);

  const { broadcastUsePowerUp } = useMatch();

  return (
    <>
      {powerUpState.result ? (
        <PowerUpResultView result={powerUpState.result} />
      ) : (
        <>
          <p>Target ID: {powerUpState.targetPlayerId}</p>
          <PrimaryButton primaryText="go for it!" onClick={() => broadcastUsePowerUp()} />
          <PrimaryButton
            onClick={() => {
              setTurnActionStep("pickAction");
              reset();
            }}
            primaryText="Reset"
          />
        </>
      )}
    </>
  );
};
