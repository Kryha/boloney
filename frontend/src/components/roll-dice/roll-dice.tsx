import { FC } from "react";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { useMatch } from "../../service";
import { Player } from "../../types";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import { ThrowDice } from "./throw-dice";
// import { diceInitialize } from "./initialize-dice";
import { useViewport } from "../../hooks";
import { RollDiceContainer } from "./styles";
import { init } from "./new-dice";

interface RollDiceProps {
  localPlayer: Player;
}

export const RollDice: FC<RollDiceProps> = ({ localPlayer }) => {
  const { broadcastPlayerReady } = useMatch();
  const { height, width } = useViewport();
  init();
  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.findOutYourPips(localPlayer.username)}</Heading2>
      <RollDiceContainer height={height} id="ThreeJS"></RollDiceContainer>
      {/* <ThrowDice /> */}
      <PrimaryButton text={text.match.goForIt} onClick={() => broadcastPlayerReady()} />
    </BottomButtonWrapper>
  );
};
