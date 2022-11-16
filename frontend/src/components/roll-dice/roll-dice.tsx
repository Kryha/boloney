import { FC, useState } from "react";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { fakeDiceRolls, useMatch } from "../../service";
import { Player } from "../../types";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import Scene from "../dice-roller-master/Scene";
import { DiceRolls } from "./dice-rolls";
import { Die } from "../die";
import { DiceValueContainer, AttributesContainer } from "./styles";
import { useTimeout } from "usehooks-ts";
import { Stuff } from "../dice/stuff";

interface RollDiceProps {
  localPlayer: Player;
}

export const RollDice: FC<RollDiceProps> = ({ localPlayer }) => {
  const { broadcastPlayerReady } = useMatch();

  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.findOutYourPips(localPlayer.username)}</Heading2>
      <Stuff />
    </BottomButtonWrapper>
  );
};
