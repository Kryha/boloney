import { FC } from "react";
import { text } from "../../assets";

import { useStore } from "../../store";
import { PowerUpId, UsePowerUpPayloadBackend } from "../../types";
import { getPowerUpData } from "../../util";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";
import { PowerUpResult } from "./power-up-result";
import { SumResult } from "./sum-result";
import { TextResult } from "./text-result";

interface Props {
  result: UsePowerUpPayloadBackend;
}

export const PowerUpResultView: FC<Props> = ({ result }) => {
  const setPlayerRoundData = useStore((state) => state.setPlayerRoundData);
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const resetPowerUpState = useStore((state) => state.resetPowerUpState);

  const showResult = () => {
    switch (result.id) {
      case "1": {
        // TODO: extract from payload after power-up gets implemented
        const isWinner = false;
        return <TextResult isWinner={isWinner} />;
      }
      case "2": {
        setPlayerRoundData(result.data.targetId, { diceSum: result.data.sum });
        return <SumResult sum={result.data.sum} />;
      }
      case "4":
      case "5":
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
