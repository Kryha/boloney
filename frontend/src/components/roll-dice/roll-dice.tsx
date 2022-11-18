import { FC } from "react";
import { avatars, text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import { RollingDice } from "../dice-animation";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";

export const localPlayer = {
  hasRolledDice: false,
  userId: "1",
  username: "history",
  avatarId: 7,
  diceAmount: 1,
  powerUpsAmount: 1,
  isConnected: true,
  isReady: false,
  hasInitialPowerUps: true,
};

export const dice = [
  { rolledValue: 6 },
  { rolledValue: 5 },
  { rolledValue: 4 },
  { rolledValue: 3 },
  { rolledValue: 2 },
  { rolledValue: 1 },
];
export const RollDice: FC = () => {
  // const localPlayer = useStore((state) => state.getLocalPlayer());
  // const dice = useStore((state) => state.diceValue);

  // if (!localPlayer || !dice || !dice.length) return <ErrorView />;

  const diceColor = avatars[localPlayer.avatarId].color;

  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.findOutYourPips(localPlayer.username)}</Heading2>
      <RollingDice dice={dice} dieColor={diceColor} />
    </BottomButtonWrapper>
  );
};
