import { FC } from "react";
import { ARRAY_OF_POSABLE_DIE_FACES } from "../../constants";
import { dieSizes, radius, spacing, dieSelectorGridTemplateColumns } from "../../design";
import { Bid } from "../../types";
import { Die } from "./die";
import { DieSelectionGrid, DieSelectionWrapper } from "./styles";

interface DiceSelectionGridProps {
  lastBid?: Bid;
  pipAmountSelected: number;
  dieColor: string;
  totalDiceInMatch: number;
  handleSelection: (die: number) => void;
}

/**
 * @description This component is used to render the dice selection grid for the place bid form.
 * @param lastBid - The last bid that was placed.
 * @param pipAmountSelected - The pip amount selected by the user.
 * @param dieColor - The color of the die.
 * @param totalDiceInMatch - The total amount of dice in the match.
 * @param handleSelection - The function that handles the selection of a die.
 */

export const DiceSelectionGrid: FC<DiceSelectionGridProps> = ({
  lastBid,
  pipAmountSelected,
  dieColor,
  totalDiceInMatch,
  handleSelection,
}) => {
  const isDisabled = (die: number) => {
    return !!lastBid && lastBid.amount === totalDiceInMatch && lastBid.face >= die;
  };

  return (
    <DieSelectionGrid
      gridTemplateColumns={dieSelectorGridTemplateColumns.bidView}
      gap={spacing.xs}
      alignItems="center"
      justifyItems="center"
    >
      {ARRAY_OF_POSABLE_DIE_FACES.map((die, index) => (
        <DieSelectionWrapper
          key={index}
          isSelected={pipAmountSelected === die}
          disabled={isDisabled(die)}
          onClick={() => handleSelection(die)}
          alignItems="center"
          justifyContent="center"
        >
          <Die
            dieColor={dieColor}
            pipAmount={die}
            size={pipAmountSelected === die ? dieSizes.selectedDie : dieSizes.minHeight}
            radius={radius.sm}
          />
        </DieSelectionWrapper>
      ))}
    </DieSelectionGrid>
  );
};
