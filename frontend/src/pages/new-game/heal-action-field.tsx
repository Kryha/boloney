import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, Input } from "../../components";
import { MAX_HEAL_POWER_UP_AMOUNT, MAX_STAGE_NUMBER_DIVISOR, MIN_HEAL_POWER_UP_AMOUNT, MIN_STAGE_NUMBER_DIVISOR } from "../../constants";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { InputFieldContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const HealActionField: FC<Props> = ({ register }) => {
  return (
    <InputFieldContainer>
      <Input label={text.newGame.healAction}>
        <BaseSelect {...register("healAction")}>
          {range(MAX_HEAL_POWER_UP_AMOUNT, MIN_HEAL_POWER_UP_AMOUNT).map((n) => (
            <BaseOption key={n} value={n}>
              {text.param.healAmount(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </Input>
      <Input label={text.newGame.stageNumberDivisor}>
        <BaseSelect {...register("stageNumber")}>
          {range(MAX_STAGE_NUMBER_DIVISOR, MIN_STAGE_NUMBER_DIVISOR).map((n) => (
            <BaseOption key={n} value={n}>
              {n}
            </BaseOption>
          ))}
        </BaseSelect>
      </Input>
    </InputFieldContainer>
  );
};
