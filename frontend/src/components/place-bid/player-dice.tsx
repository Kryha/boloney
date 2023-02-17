import { FC } from "react";
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
            faceColor={dieColor}
            value={die.rolledValue}
            size={selectedDice.includes(index) ? selectorDieSize.selected : selectorDieSize.idle}
          />
        </DieWrapper>
      ))}
    </PlayerDiceContainer>
  );
};
