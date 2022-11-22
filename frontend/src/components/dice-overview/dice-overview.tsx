import { FC } from "react";

import { DieOverviewWrapper, DieOverviewContainer, YourDiceContainer } from "./styles";
import { Die as DieComponent } from "../die";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";
import { useViewport } from "../../hooks";
import { Die } from "../../types";
import { useStore } from "../../store";

interface DiceOverviewProps {
  dice?: Die[];
}

export const DiceOverview: FC<DiceOverviewProps> = ({ dice }) => {
  const { height } = useViewport();
  const isDiceThrown = useStore((state) => state.isDiceThrown);
  const isDiceStable = useStore((state) => state.isDiceStable);
  const hasRolledDice = useStore((state) => state.hasRolledDice);

  if (!dice || !dice.length) return <DieOverviewContainer height={height} />;

  const showDice = isDiceThrown && hasRolledDice;
  console.log(showDice);
  console.log(isDiceStable, "stable");
  console.log(isDiceThrown, "isDiceThrown");
  console.log(hasRolledDice, "hasrolleddice");
  return (
    <>
      {showDice && (
        <DieOverviewWrapper>
          <DieOverviewContainer height={height}>
            <GeneralText>{text.param.xAmount(dice.length)}</GeneralText>
            <YourDiceContainer>
              {dice.map((die, index) => (
                <DieComponent key={index} value={die.rolledValue} />
              ))}
            </YourDiceContainer>
          </DieOverviewContainer>
        </DieOverviewWrapper>
      )}
    </>
  );
};
