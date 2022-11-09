import { FC } from "react";

import { useMatch } from "../../service";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import { Player } from "../../types";

interface GetPowerUpsProps {
  localPlayer?: Player;
}
export const GetPowerUps: FC<GetPowerUpsProps> = ({ localPlayer }) => {
  const { broadcastPlayerReady } = useMatch();

  if (!localPlayer) return <></>;

  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={100} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2>{text.powerUps.yourPowerUps}</Heading2>
      <Heading2 customColor={color.darkGrey}>{text.param.powerUpsHiddenMoves(localPlayer.username)}</Heading2>
      <PrimaryButton text={text.match.goForIt} onClick={() => broadcastPlayerReady()} />
    </BottomButtonWrapper>
  );
};
