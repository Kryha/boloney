import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect, InputLegend } from "../../components";
import { MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER } from "../../constants";
import { zIndex } from "../../design";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { PlayersDiceContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
  minPowerUps: number;
}

export const PowerUpsAmountField: FC<Props> = ({ register, minPowerUps }) => {
  const initAmountPowerUpIds = range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER);
  const maxAmountPowerUps = range(MAX_POWERUPS_PER_PLAYER, Math.round(minPowerUps));

  return (
    <PlayersDiceContainer zIndex={zIndex.overlay}>
      <InputLegend
        label={text.newMatch.initialPowerUpAmount}
        isRow
        tooltipInfo={text.general.toolTipPowerUpInfo}
        tooltipTitle={text.general.toolTipPowerUpTitle}
      >
        <BaseSelect {...register("initialPowerUpAmount")}>
          {initAmountPowerUpIds.map((powerUpAmount) => (
            <BaseOption key={powerUpAmount} value={powerUpAmount}>
              {text.param.powerUps(powerUpAmount)}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
      <InputLegend
        label={text.newMatch.maxPowerUpAmount}
        isRow
        childNode={2}
        tooltipInfo={text.general.toolTipPowerUpMaxInfo}
        tooltipTitle={text.general.toolTipPowerUpMaxTitle}
      >
        <BaseSelect {...register("maxPowerUpAmount")}>
          {maxAmountPowerUps.map((maxPowerupAmount) => (
            <BaseOption key={maxPowerupAmount} value={maxPowerupAmount}>
              {text.param.powerUps(maxPowerupAmount)}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
    </PlayersDiceContainer>
  );
};
