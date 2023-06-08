import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseOption, BaseSelect } from "../../atoms";
import { MAX_DICE_PER_PLAYER, MAX_PLAYERS, MIN_DICE_PER_PLAYER, MIN_PLAYERS } from "../../constants";
import { InputLegend } from "../../molecules";
import { MatchSettings } from "../../types";
import { range } from "../../util";
import { MatchFormContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const PlayersField: FC<Props> = ({ register }) => {
  return (
    <MatchFormContainer>
      <InputLegend
        label={text.newMatch.players}
        isRow
        tooltipDescription={text.general.toolTipPlayerInfo}
        tooltipTitle={text.general.toolTipPlayerTitle}
        infoPosition="top"
      >
        <BaseSelect {...register("players")}>
          {range(MAX_PLAYERS, MIN_PLAYERS).map((n) => (
            <BaseOption key={n} value={n}>
              {text.param.players(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
      <InputLegend
        label={text.newMatch.dicePerPlayer}
        isRow
        childNode={2}
        tooltipDescription={text.general.toolTipDiceInfo}
        tooltipTitle={text.general.toolTipDiceTitle}
        infoPosition="right"
      >
        <BaseSelect {...register("dicePerPlayer")}>
          {range(MAX_DICE_PER_PLAYER, MIN_DICE_PER_PLAYER).map((n) => (
            <BaseOption key={n} value={n}>
              {text.param.dice(n)}
            </BaseOption>
          ))}
        </BaseSelect>
      </InputLegend>
    </MatchFormContainer>
  );
};
