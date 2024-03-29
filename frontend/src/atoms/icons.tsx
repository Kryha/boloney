import { FC } from "react";
import { BaseIconProps, BaseIconWrapper, DiceIconProps, DiceIconWrapper } from "./icon-wrappers";

export const BaseIcon: FC<BaseIconProps> = ({
  src,
  width,
  height,
  iconColor,
  pointer,
  radius,
  shadow,
  zIndex,
  disabled,
  disabledColor,
  strokeColor,
  onClick,
  pipColor,
  display,
  alignSelf,
  padding,
}) => {
  return (
    <BaseIconWrapper
      width={width}
      height={height}
      iconColor={iconColor}
      pipColor={pipColor}
      pointer={pointer}
      radius={radius}
      shadow={shadow}
      zIndex={zIndex}
      disabled={disabled}
      disabledColor={disabledColor}
      strokeColor={strokeColor}
      onClick={onClick}
      display={display}
      alignSelf={alignSelf}
      padding={padding}
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
  pointer,
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
      pointer={pointer}
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
