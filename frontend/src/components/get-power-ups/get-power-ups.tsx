import { FC } from "react";
import { text } from "../../assets";
import { color } from "../../design";
import { useTimer } from "../../hooks";
import { BottomButtonWrapper, Heading1, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { TimerHeader } from "../timer-header";

interface Props {
  matchStageReady: () => void;
}

// TODO: finish component
export const GetPowerUps: FC<Props> = ({ matchStageReady }) => {
  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={100} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2>{text.powerUps.yourPowerUps}</Heading2>
      <Heading2 customColor={color.darkGrey}>{text.param.powerUpsHiddenMoves("skinny boy")}</Heading2>
      <PrimaryButton text={text.match.goForIt} onClick={() => matchStageReady()} />
    </BottomButtonWrapper>
  );
};
