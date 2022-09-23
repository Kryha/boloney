import { BaseLayout, GameLayout, Hand, TopNavigation } from "../../components";
import { RightSection } from "../../components/base-layout/styles";
import { HUD } from "../../components/hud";
import { Players } from "../../service/fake-players";
import { ThrowDiceContainer } from "./styles";

export const ThrowDice = () => {
  return (
    <ThrowDiceContainer>
      <BaseLayout
        leftSection={<Hand avatarName={Players[0].avatarName} name={Players[0].name} />}
        mainSection={<></>}
        rightSection={<TopNavigation isInGame />}
      />
    </ThrowDiceContainer>
  );
};
