import styled from "@emotion/styled";

import { color, margins } from "../../design";

interface PipProps {
  pipColor?: string;
  pipSize?: string;
}

export const PipContainer = styled.span<PipProps>`
  display: block;
  align-self: center;
  justify-self: center;
  width: ${({ pipSize }): string => pipSize || margins.small2};
  height: ${({ pipSize }): string => pipSize || margins.small2};
  background: ${({ pipColor }): string => pipColor || color.darkBlue};
  border-radius: ${margins.small1};
`;

interface FaceProps {
  faceColor?: string;
  faceSize?: string;
}

export const FaceWrapper = styled.div<FaceProps>`
  display: grid;
  grid-template-areas:
    "a . c"
    "e g f"
    "d . b";
  flex: 0 0 auto;
  padding: 2px;
  width: ${({ faceSize }): string => faceSize || margins.large0};
  height: ${({ faceSize }): string => faceSize || margins.large0};
  background: ${({ faceColor }): string => faceColor || color.white};
  box-shadow: 0px 0px ${margins.small2} rgba(0, 0, 0, 0.02), 0px 0px  ${margins.small5} rgba(0, 0, 0, 0.1);
  border-radius: ${margins.small1};
  ${PipContainer}:nth-of-type(2) {
    grid-area: b;
  }
  ${PipContainer}:nth-of-type(3) {
    grid-area: c;
  }
  ${PipContainer}:nth-of-type(4) {
    grid-area: d;
  }
  ${PipContainer}:nth-of-type(5) {
    grid-area: e;
  }
  ${PipContainer}:nth-of-type(6) {
    grid-area: f;
  }
  ${PipContainer}:nth-of-type(odd):last-child {
	 grid-area: g;
  }
`;
