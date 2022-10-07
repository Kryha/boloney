import { FC } from "react";

import { DieOverviewWrapper, DieOverviewContainer, YourDiceContainer } from "./styles";
import { Die } from "../die";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";
import { Die as Dice } from "../../interfaces/hud";
import { useViewport } from "../../hooks/use-viewport";

interface DiceOverviewProps {
  dice?: Dice[];
}

export const DiceOverview: FC<DiceOverviewProps> = ({ dice }) => {
  const { height } = useViewport();

  return (
    <DieOverviewWrapper>
      <DieOverviewContainer height={height}>
        {dice && (
          <>
            <YourDiceContainer>
              {dice.map((die, index) => (
                <Die key={index} value={die.rolledValue} />
              ))}
            </YourDiceContainer>
            <GeneralText>{text.param.yourDice(dice.length)}</GeneralText>
          </>
        )}
      </DieOverviewContainer>
    </DieOverviewWrapper>
  );
};
