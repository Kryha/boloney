import { FC } from "react";

import { text } from "../../assets";
import { useStore } from "../../store";
import { Heading2 } from "../atoms";
import { PowerUpResultView } from "../power-up-result-view";
import { UseBirdsEye } from "./use-birds-eye";
import { UseCoup } from "./use-coup";
import { UseGrill } from "./use-grill";
import { UseSecondChance } from "./use-second-chance";
import { UseMenageATrois } from "./use-menage-a-trois";
import { UseSmokeAndMirrors } from "./use-smoke-and-mirrors";
import { UseHypnosis } from "./use-hypnosis";
import { UseVendetta } from "./use-vendetta";

/**
 * This component will return the result views if the result is present.
 * If the result is not present, the component will return the "Use" view related to the active power-up.
 * The "Use" views are smart components that handle data input and submission for each (non immediate) power-up.
 */
export const UsePowerUp: FC = () => {
  const { active, result } = useStore((state) => state.powerUpState);

  if (result) return <PowerUpResultView result={result} />;

  const view = () => {
    if (!active) return <></>;
    switch (active.id) {
      case "1":
        return <UseGrill />;
      case "2":
        return <UseBirdsEye />;
      case "3":
        return <UseMenageATrois />;
      case "5":
        return <UseVendetta />;
      case "6":
        return <UseSecondChance />;
      case "7":
        return <UseCoup />;
      case "8":
        return <UseSmokeAndMirrors />;
      case "9":
        return <UseHypnosis />;
      default:
        return <Heading2>{text.newMatch.continueText}</Heading2>;
    }
  };

  return <>{view()}</>;
};
