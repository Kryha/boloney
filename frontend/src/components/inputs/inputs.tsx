import { FC, ReactNode } from "react";
import { text } from "../../assets/text";

import { Paragraph } from "../atoms";
import { Tooltip } from "../tooltip";
import {
  InputContainer,
  InputLabel,
  LabelContainer,
  Error,
  ErrorContainer,
  InputIconContainer,
  TextLabel,
  FieldSet,
  Legend,
  LegendContainer,
  LegendTitle,
} from "./styles";

interface InputProps {
  label?: string;
  children: ReactNode;
  isError?: boolean;
  errorMessage?: string;
  isRow?: boolean;
  childNode?: number;
  description?: string;
  tooltipInfo?: string;
  tooltipTitle?: string;
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

export const InputLegend: FC<InputProps> = ({
  children,
  label,
  isError = false,
  errorMessage,
  isRow = false,
  childNode = 1,
  tooltipInfo,
  tooltipTitle,
}) => {
  return (
    <InputContainer isError={isError} isRow={isRow} childNode={childNode}>
      <FieldSet isError={isError} isRow={isRow} childNode={childNode}>
        <Legend>
          <LegendContainer>
            <LegendTitle>{label}</LegendTitle>
            <Tooltip title={tooltipTitle} info={tooltipInfo} />
          </LegendContainer>
        </Legend>
        {children}
      </FieldSet>
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
          <Paragraph>{errorMessage || text.newMatch.invalidPercentage}</Paragraph>
        </ErrorContainer>
      )}
    </InputIconContainer>
  );
};
