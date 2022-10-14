import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, Input } from "../../components";
import { MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER } from "../../constants";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { useGameCreationFormState } from "./game-creation-form-state";
import { PowerUpsAmountFieldContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const PowerUpsAmountField: FC<Props> = ({ register }) => {
  const setAmountOfPowerUps = useGameCreationFormState((state) => state.setAmountOfPowerUps);
  const setButtonDisabled = useGameCreationFormState((state) => state.setButtonDisabled);

  return (
    <PowerUpsAmountFieldContainer>
      <Input label={text.newGame.powerupsPerPlayer}>
        <BaseSelect
          {...register("powerupsPerPlayer")}
          onChange={(e) => {
            setAmountOfPowerUps(Number(e.target.value));
            setButtonDisabled(Number(e.target.value) === 0);
          }}
        >
          {range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER).map((n) => (
            <BaseOption key={n} value={n}>
              {text.param.powerups(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </Input>
    </PowerUpsAmountFieldContainer>
  );
};
