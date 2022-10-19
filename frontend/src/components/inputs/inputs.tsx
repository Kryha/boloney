import { FC, ReactNode } from "react";
import { text } from "../../assets/text";

import { Paragraph } from "../atoms";
import { InputContainer, InputLabel, LabelContainer, Error, ErrorContainer, InputIconContainer, TextLabel } from "./styles";

interface InputProps {
  label?: string;
  children: ReactNode;
  isError?: boolean;
  errorMessage?: string;
  isRow?: boolean;
  childNode?: number;
  description?: string;
}

export const Input: FC<InputProps> = ({ children, label, isError = false, errorMessage, isRow = false, childNode = 1 }) => {
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

export const CheckboxInput: FC<InputProps> = ({ children, isError = false, errorMessage }) => {
  return (
    <InputIconContainer>
      <TextLabel>{children}</TextLabel>
      {isError && (
        <ErrorContainer>
          <Error />
          <Paragraph>{errorMessage || text.newGame.invalidPercentage}</Paragraph>
        </ErrorContainer>
      )}
    </InputIconContainer>
  );
};
