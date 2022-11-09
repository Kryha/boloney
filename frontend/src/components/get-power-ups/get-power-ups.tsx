import { FC } from "react";

import { useMatch } from "../../service";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import { Player } from "../../types";
import { DECISION_MAKING_TIME_IN_SECONDS } from "../../constants";

interface GetPowerUpsProps {
  localPlayer?: Player;
}
export const GetPowerUps: FC<GetPowerUpsProps> = ({ localPlayer }) => {
  const { broadcastPlayerReady } = useMatch();

  if (!localPlayer) return <></>;

  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={DECISION_MAKING_TIME_IN_SECONDS} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2>{text.powerUps.yourPowerUps}</Heading2>
      <Heading2 customColor={color.darkGrey}>{text.param.powerUpsHiddenMoves(localPlayer.username)}</Heading2>
      <PrimaryButton text={text.match.goForIt} onClick={() => broadcastPlayerReady()} />
    </BottomButtonWrapper>
  );
};
