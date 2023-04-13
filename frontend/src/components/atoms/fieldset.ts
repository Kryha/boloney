import styled from "@emotion/styled";

import { color, inputWidth } from "../../design";
import { BaseInput, BaseSelect } from "./input";

interface Props {
  isError?: boolean;
  isRow: boolean;
  childNode: number;
  disabled?: boolean;
}

/**
 *  This provides a grouping for a part of a form. In our case our inputs, with a nested legend element that provides a caption.
 * @constructor
 * @param {boolean} isError - If there is an error in the form.
 * @param {boolean} isRow - If there are multiple items in a row.
 * @param {number} childNode - The order of items. If there are 2 children, the second child is childNode 2. The default is one.
 * @param {boolean} disabled - The fieldset is disabled
 */

export const FieldSet = styled.fieldset<Props>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  isolation: isolate;
  position: relative;
  flex: 1;
  width: 100%;
  border: 1px solid ${({ isError }) => (isError ? color.red : color.mediumGrey)};
  border-left: none;
  border-right: none;

  :hover {
    background: ${color.cloudWhite};
  }
  :active {
    border: 1px solid ${({ disabled }) => (disabled ? color.mediumGrey : `${color.black} !important`)};
  }
  :focus {
    border: 1px solid ${({ disabled }) => (disabled ? color.mediumGrey : `${color.black} !important`)};
    outline-width: 0px !important;
    box-shadow: none;
    outline: none;
  }
  :focus-within {
    border: 1px solid ${({ disabled }) => (disabled ? color.mediumGrey : `${color.black} !important`)};
    outline-width: 0px !important;
    box-shadow: none;
    outline: none;
  }
  :disabled {
    border: 1px solid ${color.mediumGrey};
    background: ${color.transparent} !important;
  }
  ${BaseInput} {
    border: none;
    margin-top: -12px;
  }
  ${BaseSelect} {
    border: none;
    margin-top: -12px;
  }
  ${({ isRow, isError, childNode }) =>
    isRow &&
    childNode === 1 &&
    `
    border-right: 1px solid ${isError ? `${color.red}` : color.mediumGrey};
    border-left: ${isError ? `1px solid ${color.red}` : "none"};
`};
  ${({ isRow, childNode, isError }) =>
    isRow &&
    childNode === 2 &&
    `
    width: 31.25vw;
    border-right: ${isError ? `1px solid ${color.red}` : "none"};
    border-left: ${isError ? `1px solid ${color.red}` : "none"};
`};
`;

/**
 *  This is a caption nested in a fieldset.
 */

export const Legend = styled.legend`
  margin-left: ${inputWidth.sm};
  padding: 0px ${inputWidth.xxxs};
`;
