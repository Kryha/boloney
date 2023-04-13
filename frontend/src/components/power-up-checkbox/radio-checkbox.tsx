import { FC } from "react";

import { RadioInput } from "../atoms";

interface RadioButtonProps {
  onSelect: () => void;
  isChecked: boolean;
  isDisabled?: boolean;
}

export const RadioButton: FC<RadioButtonProps> = ({ onSelect, isChecked, isDisabled = false }) => {
  return <RadioInput type="checkbox" disabled={isDisabled} checked={isChecked} onChange={() => onSelect()} />;
};
