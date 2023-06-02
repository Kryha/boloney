import { FC, ReactNode } from "react";

import { BaseRow, FieldSet, Heading6, Legend } from "../../atoms";
import { spacing } from "../../design";
import { Tooltip, TooltipInfoPosition } from "../tooltip";
import { CheckboxError } from "./checkbox-error";
import { InputContainer } from "./styles";

interface InputLegendProps {
  label: string;
  children: ReactNode;
  isError?: boolean;
  errorMessage?: string;
  isRow?: boolean;
  childNode?: number;
  tooltipInfo?: ReactNode;
  tooltipTitle?: string;
  infoPosition?: TooltipInfoPosition;
  zIndex?: number;
  disabled?: boolean;
}

/**
 * @description A component that renders a label and an input field.
 * @param {string} label - The label of the input field
 * @param {ReactNode} children - The input field
 * @param {ReactNode} tooltipInfo - The tooltip info to display
 * @param {string} tooltipTitle - The tooltip title to display
 * @param {TooltipInfoPosition} infoPosition - The position of the tooltip info
 * @param {number} zIndex - The z-index of the tooltip info
 * @param {boolean} disabled - Whether the input field is disabled
 * @param {boolean} isError - Whether the input field has an error
 * @param {string} errorMessage - The error message to display
 * @param {boolean} isRow - Whether the input field should be displayed in a row
 * @param {number} childNode - The number of child nodes
 */

export const InputLegend: FC<InputLegendProps> = ({
  children,
  label,
  tooltipInfo,
  tooltipTitle,
  infoPosition,
  zIndex,
  disabled,
  errorMessage,
  isError = false,
  isRow = false,
  childNode = 1,
}) => {
  return (
    <InputContainer isRow={isRow} childNode={childNode} alignItems="flex-start">
      <FieldSet isError={isError} isRow={isRow} childNode={childNode} disabled={disabled}>
        <Legend>
          <BaseRow alignItems="center">
            <Heading6>{label}</Heading6>
            <Tooltip title={tooltipTitle} info={tooltipInfo} infoPosition={infoPosition} zIndex={zIndex} />
          </BaseRow>
        </Legend>
        {children}
      </FieldSet>
      {isError && (
        <CheckboxError errorMessage={errorMessage} position="absolute" margin={`${spacing.xxs} ${spacing.xxs} 0px ${spacing.sm}`} />
      )}
    </InputContainer>
  );
};
