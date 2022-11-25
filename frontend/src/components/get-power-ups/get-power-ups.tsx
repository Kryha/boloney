import { FC } from "react";

import { useLocalPlayer, useMatch } from "../../service";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import { DECISION_MAKING_TIME_IN_SECONDS } from "../../constants";
import { ErrorView } from "../error-view";

export const GetPowerUps: FC = () => {
  const { broadcastPlayerReady } = useMatch();

  const localPlayer = useLocalPlayer();

  if (!localPlayer) return <ErrorView />;

  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={DECISION_MAKING_TIME_IN_SECONDS} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.powerUpsHiddenMoves(localPlayer.username)}</Heading2>
      <PrimaryButton text={text.match.goForIt} onClick={() => broadcastPlayerReady()} />
    </BottomButtonWrapper>
  );
};
