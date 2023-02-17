import { FC } from "react";

import { text } from "../../assets";
import { useStore } from "../../store";
import { PowerUpId, UsePowerUpPayloadBackend } from "../../types";
import { getDieColor, getPowerUpData } from "../../util";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";
import { MenageATroisResult } from "./menage-a-trois-result";
import { SecondChanceResult } from "./second-chance-result";
import { GrillResult } from "./grill-result";
import { DoubleUpResult } from "./double-up-result";
import { PowerUpResult } from "./power-up-result";
import { SmokeAndMirrorsResult } from "./smoke-and-mirrors-result";
import { BirdsEyeResult } from "./birds-eye-result";
import { useLocalPlayer } from "../../service";
import { ErrorView } from "../error-view";

interface Props {
  result: UsePowerUpPayloadBackend;
}

export const PowerUpResultView: FC<Props> = ({ result }) => {
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const resetPowerUpState = useStore((state) => state.resetPowerUpState);

  //TODO: Make getting the die color into a hook
  const localPlayer = useLocalPlayer();

  if (!localPlayer) return <ErrorView />;

  const dieColor = getDieColor(localPlayer);

  const showResult = () => {
    switch (result.id) {
      case "1":
        return <GrillResult isCorrect={result.data.isCorrect} />;
      case "2": {
        return <BirdsEyeResult sum={result.data.sum} />;
      }
      case "7":
        return <></>;
      case "4": {
        return <DoubleUpResult data={result.data} id={result.id} />;
      }
      case "3": {
        return <MenageATroisResult data={result.data} dieColor={dieColor} />;
      }
      case "6": {
        return <SecondChanceResult data={result.data} dieColor={dieColor} />;
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
      <PrimaryButton primaryText={text.general.done} onClick={handleDone} isBottomButton />
    </BottomButtonWrapper>
  );
};
