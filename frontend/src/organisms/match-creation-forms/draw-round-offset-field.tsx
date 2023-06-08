import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect } from "../../atoms";
import { MAX_DRAW_ROUND_OFFSET, MAX_HEAL_POWER_UP_AMOUNT, MIN_DRAW_ROUND_OFFSET, MIN_HEAL_POWER_UP_AMOUNT } from "../../constants";
import { zIndex } from "../../design";
import { InputLegend } from "../../molecules";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { HealDiceContainer, MatchFormContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const DrawRoundOffsetField: FC<Props> = ({ register }) => {
  return (
    <MatchFormContainer zIndex={zIndex.modal}>
      <HealDiceContainer>
        <InputLegend
          label={text.newMatch.drawRoundOffset}
          tooltipDescription={text.general.toolTipDrawRoundOffsetInfo}
          tooltipTitle={text.general.toolTipDrawRoundOffsetTitle}
          infoPosition="right"
          isRow
          zIndex={zIndex.modal}
        >
          <BaseSelect {...register("drawRoundOffset")}>
            {range(MIN_DRAW_ROUND_OFFSET, MAX_DRAW_ROUND_OFFSET).map((n) => (
              <BaseOption key={n} value={n}>
                {n}
              </BaseOption>
            ))}
          </BaseSelect>
        </InputLegend>
      </HealDiceContainer>
      <HealDiceContainer>
        <InputLegend
          label={text.newMatch.healDie}
          isRow
          childNode={2}
          tooltipDescription={text.general.toolTipHealInfo}
          tooltipTitle={text.general.toolTipHealTitle}
          infoPosition="right"
          zIndex={zIndex.modal}
        >
          <BaseSelect {...register("healPowerUpAmount")}>
            {range(MAX_HEAL_POWER_UP_AMOUNT, MIN_HEAL_POWER_UP_AMOUNT).map((n) => (
              <BaseOption key={n} value={n}>
                {text.param.healAmount(n)}
              </BaseOption>
            ))}
          </BaseSelect>
        </InputLegend>
      </HealDiceContainer>
    </MatchFormContainer>
  );
};
