import { FC } from "react";

import { DieOverviewWrapper, DieOverviewContainer, YourDiceContainer } from "./styles";
import { Die as DieComponent } from "../die";
import { GeneralText } from "../atoms/text";
import { text } from "../../assets/text";
import { useViewport } from "../../hooks";
import { Die } from "../../types";
import { MAX_DICE_VIEW_AMOUNT } from "../../constants";
import { useLocalPlayer } from "../../service";

interface DiceOverviewProps {
  dice?: Die[];
  dieColor: string;
  extraDice: number;
}

export const DiceOverview: FC<DiceOverviewProps> = ({ dice, dieColor, extraDice }) => {
  const { height } = useViewport();
  const localPlayer = useLocalPlayer();

  if (!dice || !dice.length)
    return (
      <DieOverviewContainer height={height}>
        {localPlayer ? <GeneralText>{text.param.xAmount(localPlayer.diceAmount)}</GeneralText> : <></>}
      </DieOverviewContainer>
    );

  const isRow = dice.length < MAX_DICE_VIEW_AMOUNT;

  const isTemporaryDice = (index: number) => {
    const firstTemporaryDieIndex = dice.length - extraDice;
    return extraDice !== 0 && index >= firstTemporaryDieIndex;
  };

  return (
    <DieOverviewWrapper>
      <DieOverviewContainer height={height}>
        <GeneralText>{text.param.xAmount(dice.length)}</GeneralText>
        <YourDiceContainer isRow={isRow}>
          {dice.map((die, index) => (
            <DieComponent key={index} value={die.rolledValue} faceColor={dieColor} isRow={isRow} isTemporaryDice={isTemporaryDice(index)} />
          ))}
        </YourDiceContainer>
      </DieOverviewContainer>
    </DieOverviewWrapper>
  );
};
