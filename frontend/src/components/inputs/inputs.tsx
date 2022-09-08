import React, { FC, ReactNode } from "react";
import { InputContainer, InputLabel, LabelContainer } from "./styles";

interface InputProps {
  label?: string;
  children: ReactNode;
}

export const Input: FC<InputProps> = ({ children, label }) => {
  return (
    <InputContainer>
      <LabelContainer>
        <InputLabel>{label}</InputLabel>
      </LabelContainer>
      {children}
    </InputContainer>
  );
};
