import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, InputLegend } from "../../components";
import { MAX_DRAW_ROUND_OFFSET, MAX_HEAL_POWER_UP_AMOUNT, MIN_DRAW_ROUND_OFFSET, MIN_HEAL_POWER_UP_AMOUNT } from "../../constants";
import { zIndex } from "../../design";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { PlayersDiceContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const DrawRoundOffsetField: FC<Props> = ({ register }) => {
  return (
    <PlayersDiceContainer zIndex={zIndex.modal}>
      <InputLegend
        label={text.newMatch.drawRoundOffset}
        tooltipInfo={text.general.toolTipDrawRoundOffsetInfo}
        tooltipTitle={text.general.toolTipDrawRoundOffsetTitle}
        infoPosition="top"
        isRow
      >
        <BaseSelect {...register("drawRoundOffset")}>
          {range(MIN_DRAW_ROUND_OFFSET, MAX_DRAW_ROUND_OFFSET).map((n) => (
            <BaseOption key={n} value={n}>
              {n}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
      <InputLegend
        label={text.newMatch.healDie}
        isRow
        childNode={2}
        tooltipInfo={text.general.toolTipHealInfo}
        tooltipTitle={text.general.toolTipHealTitle}
      >
        <BaseSelect {...register("healPowerUpAmount")}>
          {range(MAX_HEAL_POWER_UP_AMOUNT, MIN_HEAL_POWER_UP_AMOUNT).map((n) => (
            <BaseOption key={n} value={n}>
              {text.param.healAmount(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
    </PlayersDiceContainer>
  );
};
