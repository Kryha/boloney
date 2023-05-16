import styled from "@emotion/styled";
import { ReactNode } from "react";
import { color, iconSize, radius as borderRadius, shadows, zIndex as customZIndex } from "../design";
import { IconProps } from "./images";

export interface BaseIconProps extends IconProps {
  src?: ReactNode;
  onClick?: () => void;
}

export interface DiceIconProps extends BaseIconProps {
  isDiceHidden?: boolean;
  borderColor?: string;
}

export const BaseIconWrapper = styled.div<IconProps>`
  width: ${({ width }) => width ?? iconSize.xxs};
  height: ${({ height }) => height ?? iconSize.xxs};
  display: ${({ display }) => display ?? "block"};
  align-self: ${({ alignSelf }) => alignSelf ?? "center"};
  > svg {
    height: ${({ height }) => height ?? iconSize.xxs};
    width: ${({ width }) => width ?? iconSize.xxs};
    border-radius: ${({ radius }) => radius ?? borderRadius.xxs};
    box-shadow: ${({ shadow }) => shadow ?? shadows.none};
    z-index: ${({ zIndex }) => zIndex ?? customZIndex.behind};
    user-select: none;

    path {
      stroke: ${({ strokeColor, disabled, disabledColor }): string =>
        disabled ? disabledColor || color.mediumGrey : strokeColor || color.transparent};
      fill: ${({ iconColor, disabled, disabledColor }): string =>
        disabled ? disabledColor || color.mediumGrey : iconColor || color.black};
    }

    ellipse {
      fill: ${({ pipColor }): string => pipColor ?? color.white};
    }

    :hover {
      cursor: ${({ pointer }): string => (pointer ? "pointer" : "default")};
    }
  }
`;

export const DiceIconWrapper = styled(BaseIconWrapper)<DiceIconProps>`
  > svg {
    path {
      fill: ${({ pipColor, disabled, disabledColor }): string => (disabled ? disabledColor || color.mediumGrey : pipColor || color.white)};
    }
    background-color: ${({ iconColor, disabled, disabledColor }): string =>
      disabled ? disabledColor || color.mediumGrey : iconColor || color.darkBlue};

    border: ${({ borderColor }): string => (borderColor ? `1px solid ${borderColor}` : "none")};

    ${({ isDiceHidden, pipColor }): string =>
      isDiceHidden
        ? `
        path {
          fill: ${pipColor || color.white};
        }
        `
        : `
        rect {
          fill: ${pipColor || color.white};
        }
    `};
    ellipse {
      fill: ${({ pipColor }): string => pipColor ?? color.white};
    }
  }
`;
