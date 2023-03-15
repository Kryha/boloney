import { FC } from "react";

import { PowerupCheckbox, RadioCheckbox } from "../atoms";

interface RadioButtonProps {
  onSelect: () => void;
  isChecked: boolean;
  isDisabled?: boolean;
  isInPowerUp?: boolean;
}

export const RadioButton: FC<RadioButtonProps> = ({ onSelect, isChecked, isDisabled = false, isInPowerUp = false }) => {
  return isInPowerUp ? (
    <PowerupCheckbox type="checkbox" checked={isChecked} onChange={() => onSelect()} />
  ) : (
    <RadioCheckbox type="checkbox" disabled={isDisabled} checked={isChecked} onChange={() => onSelect()} />
  );
};
