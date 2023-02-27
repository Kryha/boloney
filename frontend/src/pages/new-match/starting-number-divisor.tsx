import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, InputLegend, ToolTipStageNumber } from "../../components";
import { MAX_STAGE_NUMBER_DIVISOR, MIN_STAGE_NUMBER_DIVISOR } from "../../constants";
import { zIndex } from "../../design";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { PlayersDiceContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const StartingNumberDivisor: FC<Props> = ({ register }) => {
  return (
    <PlayersDiceContainer zIndex={zIndex.modalBackground}>
      <InputLegend
        label={text.newMatch.startingNumberDivisor}
        tooltipInfo={<ToolTipStageNumber />}
        tooltipTitle={text.general.toolTipStageNumberTitle}
      >
        <BaseSelect {...register("stageNumberDivisor")}>
          {range(MAX_STAGE_NUMBER_DIVISOR, MIN_STAGE_NUMBER_DIVISOR).map((n) => (
            <BaseOption key={n} value={n}>
              {n}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
    </PlayersDiceContainer>
  );
};
