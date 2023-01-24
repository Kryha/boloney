import { FC } from "react";
import { RadioCheckbox } from "../atoms";

interface RadioButtonProps {
  onSelect: () => void;
  isChecked: boolean;
}

export const RadioButton: FC<RadioButtonProps> = ({ onSelect, isChecked }) => {
  return <RadioCheckbox type="checkbox" checked={isChecked} onChange={() => onSelect()} />;
};
