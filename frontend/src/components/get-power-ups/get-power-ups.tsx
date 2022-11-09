import { FC } from "react";

import { useMatch } from "../../service";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";

// TODO: finish component
export const GetPowerUps: FC = () => {
  const { broadcastPlayerReady } = useMatch();
  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={100} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2>{text.powerUps.yourPowerUps}</Heading2>
      {/* TODO: use real player name */}
      <Heading2 customColor={color.darkGrey}>{text.param.powerUpsHiddenMoves("skinny boy")}</Heading2>
      <PrimaryButton text={text.match.goForIt} onClick={() => broadcastPlayerReady()} />
    </BottomButtonWrapper>
  );
};
