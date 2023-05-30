import { FC, ReactNode } from "react";

import { Heading6 } from "../../atoms";
import { spacing } from "../../design";
import { CheckboxError } from "./checkbox-error";
import { InputContainer, LabelContainer } from "./styles";

interface InputProps {
  label?: string;
  children: ReactNode;
  isError?: boolean;
  errorMessage?: string;
  isRow?: boolean;
  childNode?: number;
}

/**
 * @description A component that renders a label and an input field
 * @param {string} label - The label of the input field
 * @param {ReactNode} children - The input field
 * @param {boolean} isError - Whether the input field has an error
 * @param {string} errorMessage - The error message to display
 * @param {boolean} isRow - Whether the input field should be displayed in a row
 * @param {number} childNode - The number of child nodes
 */

export const Input: FC<InputProps> = ({ children, label, isError = false, errorMessage, isRow = false, childNode = 1 }) => {
  return (
    <InputContainer isRow={isRow} childNode={childNode} alignItems="flex-start">
      <LabelContainer>
        <Heading6>{label}</Heading6>
      </LabelContainer>
      {children}
      {isError && (
        <CheckboxError errorMessage={errorMessage} position="absolute" margin={`${spacing.xxs} ${spacing.xxs} 0px ${spacing.sm}`} />
      )}
    </InputContainer>
  );
};
