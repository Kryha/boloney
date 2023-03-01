import { FC } from "react";

import { text } from "../../assets";
import { useStore } from "../../store";
import { UsePowerUpPayloadBackend } from "../../types";
import { getDieColor } from "../../util";
import { BottomButtonWrapper } from "../atoms";
import { PrimaryButton } from "../buttons";
import { MenageATroisResult } from "./menage-a-trois-result";
import { SecondChanceResult } from "./second-chance-result";
import { GrillResult } from "./grill-result";
import { DoubleUpResult } from "./double-up-result";
import { SmokeAndMirrorsResult } from "./smoke-and-mirrors-result";
import { BirdsEyeResult } from "./birds-eye-result";
import { useLocalPlayer } from "../../service";
import { ErrorView } from "../error-view";
import { HypnosisResult } from "./hypnosis-result";
import { VendettaResult } from "./vendetta-result";
import { FadeTransition } from "../page-transition";

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
      case "3": {
        return <MenageATroisResult data={result.data} dieColor={dieColor} />;
      }
      case "4": {
        return <DoubleUpResult data={result.data} id={result.id} />;
      }
      case "5": {
        return <VendettaResult data={result.data} id={result.id} />;
      }
      case "6": {
        return <SecondChanceResult data={result.data} dieColor={dieColor} />;
      }
      case "7":
        return <></>;
      case "8":
        // TODO: see how to show this properly, since the turn is being changed
        return <SmokeAndMirrorsResult />;
      case "9": {
        return <HypnosisResult data={result.data} id={result.id} handleDone={handleDone} />;
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
      <FadeTransition>{showResult()}</FadeTransition>
      {result.id !== "9" && <PrimaryButton primaryText={text.general.done} onClick={handleDone} isBottomButton />}
    </BottomButtonWrapper>
  );
};
