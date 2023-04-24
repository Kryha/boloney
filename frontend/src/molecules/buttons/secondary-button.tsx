import { FC, ReactNode } from "react";
import { InfoPosition } from "../../components";
import { AlignContent, IconPosition, SecondaryButtonBase } from "../../atoms";

export interface GeneralButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  text?: string;
  buttonType?: "button" | "submit" | "reset";
  tooltipTitle?: string;
  tooltipInfo?: string;
  tooltipInfoPosition?: InfoPosition;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  padding?: string;
  active?: boolean;
  width?: string;
  justifyContent?: AlignContent;
  backgroundColor?: string;
  gap?: string;
}

export const SecondaryButton: FC<GeneralButtonProps> = ({
  disabled,
  onClick,
  text,
  icon,
  iconPosition,
  padding,
  active,
  justifyContent,
  width,
  gap,
}) => (
  <SecondaryButtonBase
    disabled={disabled}
    iconPosition={iconPosition}
    onClick={() => onClick && onClick()}
    padding={padding}
    active={active}
    justifyContent={justifyContent}
    width={width}
    gap={gap}
  >
    {text} {icon}
  </SecondaryButtonBase>
);
