import React, { FC, ReactNode } from "react";
import { text } from "../../assets/text";

import { Paragraph } from "../atoms";
import { InputContainer, InputLabel, LabelContainer, Error, ErrorContainer } from "./styles";

interface InputProps {
  label?: string;
  children: ReactNode;
  error?: boolean;
  errorMessage?: string;
}

export const Input: FC<InputProps> = ({ children, label, error = false, errorMessage }) => {
  return (
    <InputContainer isError={error}>
      <LabelContainer>
        <InputLabel>{label}</InputLabel>
      </LabelContainer>
      {children}
      {error && (
        <ErrorContainer isError={error}>
          <Error />
          <Paragraph>{errorMessage ? errorMessage : text.form.somethingWentWrong}</Paragraph>
        </ErrorContainer>
      )}
    </InputContainer>
  );
};
