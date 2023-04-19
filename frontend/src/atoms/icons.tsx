import { FC } from "react";
import { BaseIconProps, BaseIconWrapper, DiceIconProps, DiceIconWrapper } from "./icon-wrappers";

export const BaseIcon: FC<BaseIconProps> = ({
  src,
  width,
  height,
  iconColor,
  cursor,
  radius,
  shadow,
  zIndex,
  disabled,
  disabledColor,
  strokeColor,
  onClick,
  pipColor,
  display,
}) => {
  return (
    <BaseIconWrapper
      width={width}
      height={height}
      iconColor={iconColor}
      pipColor={pipColor}
      cursor={cursor}
      radius={radius}
      shadow={shadow}
      zIndex={zIndex}
      disabled={disabled}
      disabledColor={disabledColor}
      strokeColor={strokeColor}
      onClick={onClick}
      display={display}
    >
      {src}
    </BaseIconWrapper>
  );
};

export const DiceIcon: FC<DiceIconProps> = ({
  src,
  width,
  height,
  iconColor,
  cursor,
  radius,
  shadow,
  zIndex,
  disabled,
  disabledColor,
  pipColor,
  isDiceHidden,
  borderColor,
  onClick,
}) => {
  return (
    <DiceIconWrapper
      width={width}
      height={height}
      iconColor={iconColor}
      pipColor={pipColor}
      cursor={cursor}
      radius={radius}
      shadow={shadow}
      zIndex={zIndex}
      disabled={disabled}
      disabledColor={disabledColor}
      isDiceHidden={isDiceHidden}
      onClick={onClick}
      borderColor={borderColor}
    >
      {src}
    </DiceIconWrapper>
  );
};
