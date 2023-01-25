import { FC } from "react";
import { useStore } from "../../store";
import { PowerUpId } from "../../types";
import { getPowerUpData } from "../../util";
import { PowerUpResult } from "./power-up-result";
import { SumResult } from "./sum-result";
import { TextResult } from "./text-result";

interface PowerUpResultViewProps {
  id: PowerUpId;
}

export const PowerUpResultView: FC<PowerUpResultViewProps> = ({ id }) => {
  const powerUpState = useStore((state) => state.powerUpState);
  // TODO: extract from payload
  const powerUpIds: PowerUpId[] = ["1", "2"];
  const powerUpData = getPowerUpData(powerUpIds);
  const sum = 29;
  const isWinner = false;

  if (!powerUpState) return <></>;

  const showResult = () => {
    switch (id) {
      case "1":
        return <TextResult isWinner={isWinner} />;
      case "2":
        return <SumResult sum={sum} />;
      case "4":
      case "5":
      case "9":
        return <PowerUpResult id={powerUpState.active?.id} data={powerUpData} />;
      default:
        return <></>;
    }
  };

  return <>{showResult()}</>;
};
