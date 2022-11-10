import { FC } from "react";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading1, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { useMatch } from "../../service";
import { Player } from "../../types";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import { RollDiceContainer } from "./styles";
import { useViewport } from "../../hooks";

interface RollDiceProps {
  localPlayer: Player;
}

export const RollDice: FC<RollDiceProps> = ({ localPlayer }) => {
  const { broadcastPlayerReady } = useMatch();
  const { height } = useViewport();
  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.findOutYourPips(localPlayer.username)}</Heading2>
      <RollDiceContainer height={height}></RollDiceContainer>
      <PrimaryButton text={text.match.goForIt} onClick={() => broadcastPlayerReady()} />
    </BottomButtonWrapper>
  );
};
