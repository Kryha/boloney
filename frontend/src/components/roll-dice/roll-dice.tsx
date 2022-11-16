import { FC } from "react";
import { avatars, text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { Die, Player } from "../../types";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import { RollingDice } from "../dice-animation/rolling-dice";

interface RollDiceProps {
  localPlayer: Player;
  dice?: Die[];
}

export const RollDice: FC<RollDiceProps> = ({ localPlayer, dice }) => {
  if (!localPlayer || !dice || !dice.length) return <></>;

  const diceColor = avatars[localPlayer.avatarId].color;

  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.findOutYourPips(localPlayer.username)}</Heading2>
      <RollingDice dice={dice} dieColor={diceColor} />
    </BottomButtonWrapper>
  );
};
