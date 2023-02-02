import { FC, ReactNode } from "react";
import { text } from "../../assets/text";

import { Paragraph } from "../atoms";
import { InfoPosition, Tooltip } from "../tooltip";
import {
  InputContainer,
  InputLabel,
  LabelContainer,
  Error,
  InputIconContainer,
  TextLabel,
  FieldSet,
  Legend,
  LegendContainer,
  LegendTitle,
  InputErrorContainer,
  CheckboxErrorContainer,
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
  infoPosition?: InfoPosition;
}

export const Input: FC<InputProps> = ({ children, label, isError = false, errorMessage, isRow = false, childNode = 1 }) => {
  return (
    <InputContainer isError={isError} isRow={isRow} childNode={childNode}>
      <LabelContainer>
        <InputLabel>{label}</InputLabel>
      </LabelContainer>
      {children}
      {isError && (
        <InputErrorContainer>
          <Error />
          <Paragraph>{errorMessage || text.authForm.somethingWentWrong}</Paragraph>
        </InputErrorContainer>
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
  infoPosition,
}) => {
  return (
    <InputContainer isError={isError} isRow={isRow} childNode={childNode}>
      <FieldSet isError={isError} isRow={isRow} childNode={childNode}>
        <Legend>
          <LegendContainer>
            <LegendTitle>{label}</LegendTitle>
            <Tooltip title={tooltipTitle} info={tooltipInfo} infoPosition={infoPosition} />
          </LegendContainer>
        </Legend>
        {children}
      </FieldSet>
      {isError && (
        <InputErrorContainer>
          <Error />
          <Paragraph>{errorMessage || text.authForm.somethingWentWrong}</Paragraph>
        </InputErrorContainer>
      )}
    </InputContainer>
  );
};

export const CheckboxInput: FC<InputProps> = ({ children, isError = false, errorMessage }) => {
  return (
    <InputIconContainer>
      <TextLabel>{children}</TextLabel>
      {isError && (
        <CheckboxErrorContainer>
          <Error />
          <Paragraph>{errorMessage || text.newMatch.invalidPercentage}</Paragraph>
        </CheckboxErrorContainer>
      )}
    </InputIconContainer>
  );
};
