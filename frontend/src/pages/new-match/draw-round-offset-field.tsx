import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, InputLegend } from "../../components";
import { MAX_DRAW_ROUND_OFFSET, MIN_DRAW_ROUND_OFFSET } from "../../constants";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { InputFieldContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const DrawRoundOffsetField: FC<Props> = ({ register }) => {
  return (
    <InputFieldContainer>
      <InputLegend
        label={text.newMatch.drawRoundOffset}
        tooltipInfo={text.general.toolTipDrawRoundOffsetInfo}
        tooltipTitle={text.general.toolTipDrawRoundOffsetTitle}
      >
        <BaseSelect {...register("drawRoundOffset")}>
          {range(MIN_DRAW_ROUND_OFFSET, MAX_DRAW_ROUND_OFFSET).map((n) => (
            <BaseOption key={n} value={n}>
              {n}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
    </InputFieldContainer>
  );
};
