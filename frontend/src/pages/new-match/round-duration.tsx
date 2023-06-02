import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { text } from "../../assets";
import { BaseInput } from "../../atoms";
import { InputLegend } from "../../components";
import { zIndex } from "../../design";
import { MatchSettings } from "../../types";
import { PlayersDiceContainer } from "./styles";

interface Props {
  register: UseFormRegister<MatchSettings>;
}

export const RoundDurationField: FC<Props> = ({ register }) => {
  return (
    <PlayersDiceContainer zIndex={zIndex.modalBackground}>
      <InputLegend label={text.newMatch.durationPlayerTurn} tooltipInfo={text.newMatch.tooltipRoundDurationInfo}>
        <BaseInput type="text" {...register("matchStageDuration.playerTurnLoopStage", { required: true })} defaultValue="60" />
      </InputLegend>
    </PlayersDiceContainer>
  );
};
