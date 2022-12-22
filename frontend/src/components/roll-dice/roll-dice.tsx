import { FC } from "react";

import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import { useStore } from "../../store";
import { ErrorView } from "../error-view";
import { PrimaryButton } from "../buttons";
import { useLocalPlayer, useMatch } from "../../service";
import { MatchOpCode } from "../../types";
import { ButtonReady } from "../button-ready";
import { getDieColor } from "../../util";
import { RollingDice } from "../dice-animation";

export const RollDice: FC = () => {
  const { sendMatchState } = useMatch();

  const hasRolledDice = useStore((state) => state.hasRolledDice);
  const localPlayer = useLocalPlayer();
  const dice = useStore((state) => state.diceValue);

  if (!localPlayer) return <ErrorView />;

  const dieColor = getDieColor(localPlayer);

  const button = () => {
    if (localPlayer.status === "lost") return <></>;
    if (hasRolledDice) return <ButtonReady />;
    return <PrimaryButton text={text.general.rollIt} onClick={() => sendMatchState(MatchOpCode.ROLL_DICE)} />;
  };

  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.findOutYourPips(localPlayer.username)}</Heading2>

      {dice && <RollingDice dice={dice} dieColor={dieColor} />}

      {button()}
    </BottomButtonWrapper>
  );
};
