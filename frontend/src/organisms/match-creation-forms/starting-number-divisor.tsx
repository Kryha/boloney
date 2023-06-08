import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect } from "../../atoms";
import { MAX_STAGE_NUMBER_DIVISOR, MIN_STAGE_NUMBER_DIVISOR } from "../../constants";
import { zIndex } from "../../design";
import { InputLegend, StageNumberContent } from "../../molecules";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { MatchFormContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const StartingNumberDivisor: FC<Props> = ({ register }) => {
  return (
    <MatchFormContainer zIndex={zIndex.modalBackground}>
      <InputLegend
        label={text.newMatch.startingNumberDivisor}
        tooltipInfo={<StageNumberContent />}
        tooltipTitle={text.general.toolTipStageNumberTitle}
        infoPosition="top"
      >
        <BaseSelect {...register("stageNumberDivisor")}>
          {range(MAX_STAGE_NUMBER_DIVISOR, MIN_STAGE_NUMBER_DIVISOR).map((n) => (
            <BaseOption key={n} value={n}>
              {n}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
    </MatchFormContainer>
  );
};
