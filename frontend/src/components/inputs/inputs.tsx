import React, { FC, ReactNode } from "react";
import { text } from "../../assets/text";

import { Paragraph } from "../atoms";
import { InputContainer, InputLabel, LabelContainer, Error, ErrorContainer } from "./styles";

interface InputProps {
  label?: string;
  children: ReactNode;
  isError?: boolean;
  errorMessage?: string;
}

export const Input: FC<InputProps> = ({ children, label, isError = false, errorMessage }) => {
  return (
    <InputContainer>
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
