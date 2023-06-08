import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

import { text } from "../../assets";
import { BaseInput } from "../../atoms";
import { zIndex } from "../../design";
import { InputLegend } from "../../molecules";
import { MatchSettings } from "../../types";
import { MatchFormContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const RoundDurationField: FC<Props> = ({ register }) => {
  return (
    <MatchFormContainer zIndex={zIndex.modal}>
      <InputLegend
        label={text.newMatch.durationPlayerTurn}
        tooltipDescription={text.newMatch.tooltipRoundDurationInfo}
        infoPosition="right"
        zIndex={zIndex.modal}
      >
        <BaseInput type="text" {...register("matchStageDuration.playerTurnLoopStage", { required: true })} defaultValue="60" />
      </InputLegend>
    </MatchFormContainer>
  );
};
