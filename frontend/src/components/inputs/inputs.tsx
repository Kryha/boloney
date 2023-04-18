import { FC, ReactNode } from "react";
import { ErrorIconSVG } from "../../assets";
import { text } from "../../assets/text";

import { BodyText, FieldSet, Heading6, Legend, BaseIcon } from "../../atoms";
import { InfoPosition, Tooltip } from "../tooltip";
import {
  InputContainer,
  LabelContainer,
  InputIconContainer,
  TextLabel,
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
  disabled?: boolean;
}

export const Input: FC<InputProps> = ({ children, label, isError = false, errorMessage, isRow = false, childNode = 1 }) => {
  return (
    <InputContainer isRow={isRow} childNode={childNode}>
      <LabelContainer>
        <Heading6>{label}</Heading6>
      </LabelContainer>
      {children}
      {isError && (
        <InputErrorContainer>
          <BaseIcon src={<ErrorIconSVG />} />
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
  disabled,
}) => {
  return (
    <InputContainer isRow={isRow} childNode={childNode}>
      <FieldSet isError={isError} isRow={isRow} childNode={childNode} disabled={disabled}>
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
          <BaseIcon src={<ErrorIconSVG />} />
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
          <BaseIcon src={<ErrorIconSVG />} />
          <BodyText>{errorMessage || text.newMatch.invalidPercentage}</BodyText>
        </CheckboxErrorContainer>
      )}
    </InputIconContainer>
  );
};
