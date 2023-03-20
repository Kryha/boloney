import { FC, ReactNode } from "react";
import { text } from "../../assets/text";

import { BodyText, Heading6 } from "../atoms";
import { InfoPosition, Tooltip } from "../tooltip";
import {
  InputContainer,
  LabelContainer,
  Error,
  InputIconContainer,
  TextLabel,
  FieldSet,
  Legend,
  LegendContainer,
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
  tooltipInfo?: ReactNode;
  tooltipTitle?: string;
  infoPosition?: InfoPosition;
  zIndex?: number;
}

export const Input: FC<InputProps> = ({ children, label, isError = false, errorMessage, isRow = false, childNode = 1 }) => {
  return (
    <InputContainer isError={isError} isRow={isRow} childNode={childNode}>
      <LabelContainer>
        <Heading6>{label}</Heading6>
      </LabelContainer>
      {children}
      {isError && (
        <InputErrorContainer>
          <Error />
          <BodyText>{errorMessage || text.authForm.somethingWentWrong}</BodyText>
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
  zIndex,
}) => {
  return (
    <InputContainer isError={isError} isRow={isRow} childNode={childNode}>
      <FieldSet isError={isError} isRow={isRow} childNode={childNode}>
        <Legend>
          <LegendContainer>
            <Heading6>{label}</Heading6>
            <Tooltip title={tooltipTitle} info={tooltipInfo} infoPosition={infoPosition} zIndex={zIndex} />
          </LegendContainer>
        </Legend>
        {children}
      </FieldSet>
      {isError && (
        <InputErrorContainer>
          <Error />
          <BodyText>{errorMessage || text.authForm.somethingWentWrong}</BodyText>
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
          <BodyText>{errorMessage || text.newMatch.invalidPercentage}</BodyText>
        </CheckboxErrorContainer>
      )}
    </InputIconContainer>
  );
};
