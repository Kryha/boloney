import { FC, ReactNode } from "react";

import { spacing } from "../../design";
import { CheckboxError } from "./checkbox-error";
import { InputIconContainer, TextLabel } from "./styles";

interface CheckboxInputProps {
  children: ReactNode;
  isError?: boolean;
  errorMessage?: string;
}

/**
 * @description A component that renders a label and an input field.
 * @param {string} label - The label of the input field
 * @param {ReactNode} children - The input field
 * @param {boolean} isError - Whether the input field has an error
 * @param {string} errorMessage - The error message to display
 */

export const CheckboxInput: FC<CheckboxInputProps> = ({ children, isError = false, errorMessage }) => {
  return (
    <InputIconContainer>
      <TextLabel>{children}</TextLabel>
      {isError && (
        <CheckboxError gap={spacing.xxs} errorMessage={errorMessage} margin={`${spacing.xxs} ${spacing.xxs} 0px ${spacing.sm}`} />
      )}
    </InputIconContainer>
  );
};
