import styled from "@emotion/styled";
import { color, inputWidth, spacing, wrapperSize } from "../design";

interface Props {
  width?: string;
  height?: string;
  disabled?: boolean;
}

export const SwitchWrapper = styled.div<Props>`
  position: relative;
  display: inline-block;
  width: ${inputWidth.xxl};
  height: ${inputWidth.xl};
`;

export const SwitchInput = styled.input<Props>`
  width: 0;
  height: 0;
  opacity: 0;

  :checked + .slider {
    background-color: ${color.black};
  }
  :focus + .slider {
    border: 1px solid ${color.black};
  }
  :checked + .slider:before {
    transform: translateX(${inputWidth.md});
    background-color: ${color.lightGrey};
    left: ${spacing.xxs};
  }
`;

export const Slider = styled.span<Props>`
  position: absolute;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${color.lightGrey};
  border: 1px solid ${({ disabled }) => (disabled ? color.darkGrey : color.black)};
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: ${wrapperSize.md};

  :before {
    position: absolute;
    content: "";
    height: ${inputWidth.md};
    width: ${inputWidth.md};
    top: 0;
    bottom: 0;
    margin: auto 0;
    left: ${spacing.xxs};
    background-color: ${({ disabled }) => (disabled ? color.mediumGrey : color.black)};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
