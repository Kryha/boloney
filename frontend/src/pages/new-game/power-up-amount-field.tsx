import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, InputLegend } from "../../components";
import { MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER } from "../../constants";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { PlayersDiceContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const PowerUpsAmountField: FC<Props> = ({ register }) => {
  return (
    <PlayersDiceContainer>
      <InputLegend label={text.newGame.initialPowerUpAmount} isRow>
        <BaseSelect {...register("initialPowerUpAmount")}>
          {range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER).map((n) => (
            <BaseOption key={n} value={n}>
              {text.param.powerUps(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
      <InputLegend label={text.newGame.maxPowerUpAmount} isRow childNode={2}>
        <BaseSelect {...register("maxPowerUpAmount")}>
          {range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER).map((n) => (
            <BaseOption key={n} value={n}>
              {text.param.powerUps(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
    </PlayersDiceContainer>
  );
};
