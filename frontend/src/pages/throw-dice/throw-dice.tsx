import Dice from "react-dice-roll";
import { BaseLayout, GameLayout, Hand, TopNavigation } from "../../components";
import { RightSection } from "../../components/base-layout/styles";
import { HUD } from "../../components/hud";
import { color } from "../../design";
import { Players } from "../../service/fake-players";
import { DiceContainer, ThrowDiceContainer } from "./styles";

export const ThrowDice = () => {
  return (
    <ThrowDiceContainer>
      <BaseLayout
        leftSection={<Hand avatarName={Players[0].avatarName} name={Players[0].name} />}
        mainSection={
          <DiceContainer>
            <Dice onRoll={(value) => console.log(value)} size={100} faceBg={color.lightGrey} />
          </DiceContainer>
        }
        rightSection={<TopNavigation isInGame />}
      />
    </ThrowDiceContainer>
  );
};
