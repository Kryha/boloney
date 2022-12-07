import { FC } from "react";

import { useLocalPlayer } from "../../service";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import { DECISION_MAKING_TIME_IN_SECONDS } from "../../constants";
import { ErrorView } from "../error-view";
import { ButtonReady } from "../button-ready";

export const GetPowerUps: FC = () => {
  const localPlayer = useLocalPlayer();

  if (!localPlayer) return <ErrorView />;

  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={DECISION_MAKING_TIME_IN_SECONDS} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.powerUpsHiddenMoves(localPlayer.username)}</Heading2>

      <ButtonReady />
    </BottomButtonWrapper>
  );
};
