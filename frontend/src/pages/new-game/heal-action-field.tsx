import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, Input } from "../../components";
import { MAX_POWERUPS_PER_PLAYER, MAX_STAGE_NUMBER_DIVISOR, MIN_POWERUPS_PER_PLAYER, MIN_STAGE_NUMBER_DIVISOR } from "../../constants";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { HealFieldContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const HealActionField: FC<Props> = ({ register }) => {
  return (
    <HealFieldContainer>
      <Input label={text.newGame.healAction}>
        <BaseSelect {...register("healAction")}>
          {range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER).map((n) => (
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
              {text.param.dice(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </Input>
    </HealFieldContainer>
  );
};
