import { FC, useState } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, Input } from "../../components";
import { MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER } from "../../constants";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { useGameCreationFormState } from "./game-creation-form-state";
import { Fields } from "./new-game-creation";
import { PowerupsAmountFieldContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const PowerupsAmountField: FC<Props> = ({ register }) => {
  const setAmountOfPowerups = useGameCreationFormState((state) => state.setAmountOfPowerups);
  return (
    <PowerupsAmountFieldContainer>
      <Input label={text.newGame.powerupsPerPlayer}>
        <BaseSelect {...register("powerupsPerPlayer")} onChange={(e) => setAmountOfPowerups(Number(e.target.value))}>
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
