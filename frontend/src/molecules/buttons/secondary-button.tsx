import { FC, ReactNode } from "react";
import { IconPosition, InfoPosition, SecondaryButtonBase } from "../../components";

export type JustifyContent =
  | "center"
  | "start"
  | "end"
  | "flex-start"
  | "flex-end"
  | "left"
  | "right"
  | "normal"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch";

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
  justifyContent?: JustifyContent;
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
}) => (
  <SecondaryButtonBase
    disabled={disabled}
    iconPosition={iconPosition}
    onClick={() => onClick && onClick()}
    padding={padding}
    active={active}
    justifyContent={justifyContent}
  >
    {text} {icon}
  </SecondaryButtonBase>
);
