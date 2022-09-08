import styled from "@emotion/styled";

import { color, fontWeight } from "../../design";

export const BaseInput = styled.input`
  font-family: ibm-plex-mono;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  color: #292929;
  background-color: transparent;
  width: 100%;
  -moz-appearance: textfield;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::placeholder {
    font-family: ibm-plex-mono;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: #292929;
  }

  box-sizing: border-box;
  outline: 1px solid #B6B6B9;
  border: none;
  padding: 23px 40px;
  :hover {
    outline: 1px solid ${color.black};
  }
  :active {
    outline: 1px solid ${color.black};
  }
  :disabled {
    &::placeholder {
      color: #989898;
    }
  }
  &[type="password"] {
    -webkit-text-security: square;
  }
`;
