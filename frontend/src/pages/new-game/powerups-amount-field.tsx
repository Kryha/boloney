import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, Input } from "../../components";
import { MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER } from "../../constants";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { PowerUpsAmountFieldContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const PowerUpsAmountField: FC<Props> = ({ register }) => {
  return (
    <PowerUpsAmountFieldContainer>
      <Input label={text.newGame.powerUpsPerPlayer}>
        <BaseSelect {...register("powerUpsPerPlayer")}>
          {range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER).map((n) => (
            <BaseOption key={n} value={n}>
              {text.param.powerUps(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </Input>
    </PowerUpsAmountFieldContainer>
  );
};
