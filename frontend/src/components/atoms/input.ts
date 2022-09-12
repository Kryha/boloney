import styled from "@emotion/styled";

import { color, fontSize, fontWeight, margins } from "../../design";

export const BaseInput = styled.input`
  font-family: ibm-plex-mono;
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.small1};
  line-height: 24px;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: ${color.black};
  background-color: transparent;
  width: 100%;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::placeholder {
    font-family: ibm-plex-mono;
    font-weight: ${fontWeight.light};
    font-size: ${fontSize.small1};
    line-height: 24px;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: ${color.black};
  }
  box-sizing: border-box;
  outline: 1px solid ${color.mediumGrey};
  border: none;
  padding: 23px ${margins.large0};
  :hover {
    outline: 1px solid ${color.black};
  }
  :active {
    outline: 1px solid ${color.black};
  }
  :disabled {
    &::placeholder {
      color: ${color.darkGrey};
    }
  }
`;