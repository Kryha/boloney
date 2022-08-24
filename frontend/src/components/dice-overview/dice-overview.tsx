import { FC } from "react";

import { DieOverviewWrapper, DieOverviewContainer, YourDiceContainer } from "./styles";
import { Die } from "../die";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";
import { Die as Dice } from "../../interfaces/hud";

interface DiceOverviewProps {
  dice: Dice[];
}

export const DiceOverview: FC<DiceOverviewProps> = ({ dice }) => {
  return (
    <DieOverviewWrapper>
      <DieOverviewContainer>
        <YourDiceContainer>
          {dice.map((die, index) => (
            <Die key={index} value={die.rolledValue} />
          ))}
        </YourDiceContainer>
        <GeneralText>{text.param.yourDice(7)}</GeneralText>
      </DieOverviewContainer>
    </DieOverviewWrapper>
  );
};
