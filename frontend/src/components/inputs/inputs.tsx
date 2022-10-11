import { FC, ReactNode } from "react";
import { text } from "../../assets/text";

import { GeneralText, Paragraph } from "../atoms";
import {
  InputContainer,
  InputLabel,
  LabelContainer,
  Error,
  ErrorContainer,
  InputIconContainer,
  PercentageInput,
  TextLabel,
} from "./styles";

interface InputProps {
  label?: string;
  children: ReactNode;
  isError?: boolean;
  errorMessage?: string;
  isRow?: boolean;
  childNode?: number;
  description?: string;
}

export const Input: FC<InputProps> = ({ children, label, isError = false, errorMessage, isRow = false, childNode = 1, description }) => {
  return (
    <InputContainer isError={isError} isRow={isRow} childNode={childNode}>
      <LabelContainer>
        <InputLabel>{label}</InputLabel>
      </LabelContainer>
      {children}
      {isError && (
        <ErrorContainer>
          <Error />
          <Paragraph>{errorMessage || text.authForm.somethingWentWrong}</Paragraph>
        </ErrorContainer>
      )}
    </InputContainer>
  );
};

export const CheckboxInput: FC<InputProps> = ({ children, label, isError = false, errorMessage }) => {
  return (
    <InputIconContainer isError={isError}>
      <TextLabel>{children}</TextLabel>
      {isError && (
        <ErrorContainer>
          <Error />
          <Paragraph>{errorMessage || text.newGameForm.errorMessages.invalidPercentage}</Paragraph>
        </ErrorContainer>
      )}
    </InputIconContainer>
  );
};
