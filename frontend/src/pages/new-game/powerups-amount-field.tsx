import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, Input } from "../../components";
import { MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER } from "../../constants";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { useGameCreationFormState } from "./game-creation-form-state";
import { InputFieldContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const PowerUpsAmountField: FC<Props> = ({ register }) => {
  const setAmountOfPowerUps = useGameCreationFormState((state) => state.setAmountOfPowerUps);
  return (
    <InputFieldContainer>
      <Input label={text.newGame.powerUpsPerPlayer}>
        <BaseSelect {...register("powerUpsPerPlayer")} onChange={(e) => setAmountOfPowerUps(Number(e.target.value))}>
          {range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER).map((n) => (
            <BaseOption key={n} value={n}>
              {text.param.powerUps(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </Input>
      <Input label={text.newGame.drawRoundOffset}>
        <BaseSelect {...register("drawRoundOffset")}>
          {range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER).map((n) => (
            <BaseOption key={n} value={n}>
              {n}
            </BaseOption>
          ))}
        </BaseSelect>
      </Input>
    </InputFieldContainer>
  );
};
