import { FC } from "react";
import { avatars, text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import { RollingDice } from "../dice-animation/rolling-dice";
import { useStore } from "../../store";
import { ErrorView } from "..";

export const RollDice: FC = () => {
  const localPlayer = useStore((state) => state.getLocalPlayer());
  const dice = useStore((state) => state.diceValue);

  if (!localPlayer || !dice || !dice.length) return <ErrorView />;

  const diceColor = avatars[localPlayer.avatarId].color;

  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.findOutYourPips(localPlayer.username)}</Heading2>
      <RollingDice dice={dice} dieColor={diceColor} />
    </BottomButtonWrapper>
  );
};
