import { FC } from "react";
import { TertiaryButtonBase } from "../../atoms";
import { GeneralButtonProps } from "./secondary-button";

export const TertiaryButton: FC<GeneralButtonProps> = ({
  disabled,
  onClick,
  text,
  icon,
  iconPosition,
  padding,
  active,
  width,
  justifyContent,
  backgroundColor,
  gap,
}) => (
  <TertiaryButtonBase
    disabled={disabled}
    iconPosition={iconPosition}
    onClick={() => onClick && onClick()}
    padding={padding}
    active={active}
    width={width}
    justifyContent={justifyContent}
    backgroundColor={backgroundColor}
    gap={gap}
  >
    {text} {icon}
  </TertiaryButtonBase>
);
