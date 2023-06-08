import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect } from "../../atoms";
import { MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER } from "../../constants";
import { zIndex } from "../../design";
import { InputLegend } from "../../molecules";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { MatchFormContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
  minPowerUps: number;
}

export const PowerUpsAmountField: FC<Props> = ({ register, minPowerUps }) => {
  const initAmountPowerUpIds = range(MAX_POWERUPS_PER_PLAYER, MIN_POWERUPS_PER_PLAYER);
  const maxAmountPowerUps = range(MAX_POWERUPS_PER_PLAYER, Math.round(minPowerUps));

  return (
    <MatchFormContainer zIndex={zIndex.overlay}>
      <InputLegend
        label={text.newMatch.initialPowerUpAmount}
        isRow
        tooltipDescription={text.general.toolTipPowerUpInfo}
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
        tooltipDescription={text.general.toolTipPowerUpMaxInfo}
        tooltipTitle={text.general.toolTipPowerUpMaxTitle}
        infoPosition="right"
      >
        <BaseSelect {...register("maxPowerUpAmount")}>
          {maxAmountPowerUps.map((maxPowerupAmount) => (
            <BaseOption key={maxPowerupAmount} value={maxPowerupAmount}>
              {text.param.powerUps(maxPowerupAmount)}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
    </MatchFormContainer>
  );
};
