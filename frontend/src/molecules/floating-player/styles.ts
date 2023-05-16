import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BaseColumn, bounce, shadow } from "../../atoms";
import { FLOATING_ANIMATION_SPEED } from "../../constants";
import { color, layoutWidth } from "../../design";
import { avatarHeight } from "../../design/avatar";
import { AvatarWrapper } from "../player-avatar";

interface AvatarProps {
  speed: number;
  height?: string;
  width?: string;
}

export const FloatingAvatarWrapper = styled(BaseColumn)<AvatarProps>`
  position: relative;
  height: ${({ height }) => height ?? avatarHeight.lg};
  width: ${({ width }) => width ?? layoutWidth.sm};
  ${AvatarWrapper} {
    ${({ speed }) => {
      return css`
        animation: ${bounce} ease ${speed * 2}s infinite forwards;
      `;
    }};
  }
`;

interface ShadowProps {
  smallWidth: number;
  largeWidth: number;
  speed: number;
}

export const ShadowWrapper = styled.div<ShadowProps>`
  background: radial-gradient(50% 50%, ${color.mediumGrey} 0%, transparent 100%);
  height: 10%;
  width: ${({ smallWidth }) => `${smallWidth}%`};
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  ${({ smallWidth, largeWidth, speed }) => {
    return css`
      animation-direction: alternate;
      animation-duration: ${speed || FLOATING_ANIMATION_SPEED}s;
      animation-name: ${shadow(smallWidth, largeWidth)};
      animation-iteration-count: infinite;
    `;
  }};
`;
