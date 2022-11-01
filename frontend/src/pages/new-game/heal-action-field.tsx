import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, InputLegend } from "../../components";
import { MAX_HEAL_POWER_UP_AMOUNT, MAX_STAGE_NUMBER_DIVISOR, MIN_HEAL_POWER_UP_AMOUNT, MIN_STAGE_NUMBER_DIVISOR } from "../../constants";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { PlayersDiceContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const HealActionField: FC<Props> = ({ register }) => {
  return (
    <PlayersDiceContainer>
      <InputLegend label={text.newGame.healAction} isRow>
        <BaseSelect {...register("healPowerUpAmount")}>
          {range(MAX_HEAL_POWER_UP_AMOUNT, MIN_HEAL_POWER_UP_AMOUNT).map((n) => (
            <BaseOption key={n} value={n}>
              {text.param.healAmount(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
      <InputLegend label={text.newGame.stageNumberDivisor} isRow childNode={2}>
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
