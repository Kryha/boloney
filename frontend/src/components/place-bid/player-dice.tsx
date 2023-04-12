import { FC } from "react";
import { radius } from "../../design";
import { Die } from "../../types";
import { Die as DieComponent } from "../die";
import { Die as DieWrapper, PlayerDiceContainer, selectorDieSize } from "./styles";

interface PlayerDiceSelectorProps {
  playerDice: Die[];
  handleClick: (buttonIndex: number) => void;
  selectedDice: number[];
  dieColor: string;
}
export const PlayerDiceSelector: FC<PlayerDiceSelectorProps> = ({ playerDice, handleClick, selectedDice, dieColor }) => {
  return (
    <PlayerDiceContainer>
      {playerDice.map((die, index) => (
        <DieWrapper key={index} isSelected={selectedDice.includes(index)} onClick={() => handleClick(index)}>
          <DieComponent
            iconColor={dieColor}
            value={die.rolledValue}
            radius={radius.sm}
            size={selectedDice.includes(index) ? selectorDieSize.selected : selectorDieSize.idle}
          />
        </DieWrapper>
      ))}
    </PlayerDiceContainer>
  );
};
