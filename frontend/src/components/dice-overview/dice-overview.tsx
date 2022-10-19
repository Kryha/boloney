import { FC } from "react";

import { DieOverviewWrapper, DieOverviewContainer, YourDiceContainer } from "./styles";
import { Die as DieComponent } from "../die";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";
import { useViewport } from "../../hooks";
import { Die } from "../../types";

interface DiceOverviewProps {
  dice?: Die[];
}

export const DiceOverview: FC<DiceOverviewProps> = ({ dice }) => {
  const { height } = useViewport();

  if (!dice) return <></>;

  return (
    <DieOverviewWrapper>
      <DieOverviewContainer height={height}>
        <YourDiceContainer>
          {dice.map((die, index) => (
            <DieComponent key={index} value={die.rolledValue} />
          ))}
        </YourDiceContainer>
        <GeneralText>{text.param.yourDice(dice.length)}</GeneralText>
      </DieOverviewContainer>
    </DieOverviewWrapper>
  );
};
