import { FC } from "react";
import { text } from "../../assets";
import { BottomButtonWrapper, Heading2 } from "../atoms";
import { PrimaryButton } from "../buttons";
import { fakeDiceRolls, useMatch } from "../../service";
import { Player } from "../../types";
import { TimerHeader } from "../timer-header";
import { color } from "../../design";
import Scene from "../dice-roller-master/Scene";
import { DiceRolls } from "./dice-rolls";
import { useViewport } from "../../hooks";

interface RollDiceProps {
  localPlayer: Player;
}
const app = new Scene();
app.render();
app.init();

window.addEventListener("resize", () => app.resize());

export const RollDice: FC<RollDiceProps> = ({ localPlayer }) => {
  const { broadcastPlayerReady } = useMatch();
  const { height, width } = useViewport();
  const a = fakeDiceRolls.map((values, index, aray) => DiceRolls(values.rolledValue));
  return (
    <BottomButtonWrapper>
      <TimerHeader timeInSeconds={0} isCountDownStarted={false} title={text.powerUps.settingItUp} />
      <Heading2 customColor={color.darkGrey}>{text.param.findOutYourPips(localPlayer.username)}</Heading2>
      <PrimaryButton
        text={"roll"}
        onClick={() => {
          const dieType = app.customModels.d6;
          const amountToRoll = fakeDiceRolls.length;
          app.roll(amountToRoll, dieType, [DiceRolls[6]]);
        }}
      />
    </BottomButtonWrapper>
  );
};
