import { FC } from "react";

import { useMatch } from "../../service";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import { DECISION_MAKING_TIME_IN_SECONDS } from "../../constants";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";

export const GetPowerUps: FC = () => {
  const { broadcastPlayerReady } = useMatch();

  const session = useStore((state) => state.sessionState);
  const localPlayer = useStore((state) => state.getPlayer(session?.user_id));

  if (!localPlayer) return <ErrorView />;

  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={DECISION_MAKING_TIME_IN_SECONDS} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.powerUpsHiddenMoves(localPlayer.username)}</Heading2>
      <PrimaryButton text={text.match.goForIt} onClick={() => broadcastPlayerReady()} />
    </BottomButtonWrapper>
  );
};
