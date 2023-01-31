import { FC } from "react";

import { text } from "../../assets";
import { useStore } from "../../store";
import { PowerUpId, UsePowerUpPayloadBackend } from "../../types";
import { getPowerUpData } from "../../util";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";
import { PowerUpResult } from "./power-up-result";
import { SmokeAndMirrorsResult } from "./smoke-and-mirrors-result";
import { SumResult } from "./sum-result";
import { TextResult } from "./text-result";

interface Props {
  result: UsePowerUpPayloadBackend;
}

export const PowerUpResultView: FC<Props> = ({ result }) => {
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const resetPowerUpState = useStore((state) => state.resetPowerUpState);

  const showResult = () => {
    switch (result.id) {
      case "1":
        // TODO: extract isWinner from payload after power-up gets implemented
        return <TextResult isWinner={false} />;
      case "2": {
        return <SumResult sum={result.data.sum} />;
      }
      case "8":
        // TODO: see how to show this properly, since the turn is being changed
        return <SmokeAndMirrorsResult />;
      case "9": {
        // TODO: extract from payload after power-ups get implemented
        const powerUpIds: PowerUpId[] = ["1", "2"];
        const powerUpData = getPowerUpData(powerUpIds);
        return <PowerUpResult id={result.id} data={powerUpData} />;
      }
      default:
        return <></>;
    }
  };

  const handleDone = () => {
    setTurnActionStep("pickAction");
    resetPowerUpState();
  };

  return (
    <BottomButtonWrapper>
      {showResult()}
      <PrimaryButton primaryText={text.general.done} onClick={handleDone} />
    </BottomButtonWrapper>
  );
};
