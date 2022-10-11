import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, Input } from "../../components";
import { MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER } from "../../constants";
import { MatchSettings } from "../../interfaces";
import { range } from "../../util";
import { PowerupsAmountFieldContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const PowerupsAmountField: FC<Props> = ({ register }) => {
  return (
    <PowerupsAmountFieldContainer>
      <Input label={text.newGame.powerupsPerPlayer}>
        <BaseSelect {...register("powerupsPerPlayer")}>
          {range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER).map((n) => (
            <BaseOption key={n} value={n}>
              {text.param.powerups(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </Input>
    </PowerupsAmountFieldContainer>
  );
};
