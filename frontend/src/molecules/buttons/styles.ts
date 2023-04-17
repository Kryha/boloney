import styled from "@emotion/styled";

import { color, opacity } from "../../design";
import { BaseIconWrapper } from "../../components";

interface ButtonProps {
  disabled?: boolean;
  width?: string;
  loading?: boolean;
}

export const InitialButtonView = styled.span`
  transform: translate3d(0, 100%, 0);
  transition: opacity 0.4s, black 0.4s, transform 0.4s;
  visibility: visible;
`;

export const SecondaryView = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  opacity: ${opacity.hidden};
  transform: rotateX(-90deg) translate3d(0, 50%, 0);
  transform-origin: bottom center;
  transition: opacity 0.4s, visibility 1ms 0.4s, white 0.4s, transform 0.4s;
  visibility: hidden;
`;

export const PrimaryButtonContainer = styled.div<ButtonProps>`
  ${({ disabled, width, loading }) =>
    disabled || loading
      ? ""
      : `
        transform-origin: center;
        transform-style: preserve-3d;
        transition: transform 0.4s;
        :hover {
          width: ${width ?? "fit-content"};
          ${SecondaryView} {
            opacity: ${opacity.visible};
            transition: opacity 0.4s, white 0.4s, transform 0.4s;
            visibility: visible;
          }
          ${InitialButtonView} {
            transform: translate3d(0,100%,0);
            transition: opacity 0.4s, black 0.4s,transform 0.4s;
          }
          transform: rotateX(90deg);
        }
  `};
`;

export const PrimaryButtonWrapper = styled.div<ButtonProps>`
  cursor: ${({ disabled, loading }) => (disabled || loading ? "default" : "pointer")};
  ${BaseIconWrapper} {
    path {
      fill: ${({ disabled, loading }): string => (disabled || loading ? color.darkGrey : color.black)};
    }
  }
`;

export const LinkContainer = styled.span``;
