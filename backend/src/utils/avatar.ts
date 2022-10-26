import { AvatarColor, AvatarName } from "../types";
import { randomInt } from "./math";

export const pickAvatarColor = (colors: AvatarColor[]): [AvatarColor | undefined, AvatarColor[]] => {
  if (!colors.length) return [undefined, colors];

  const index = randomInt(colors.length - 1);
  const pickedColor = colors[index];

  const updatedColors = colors.reduce((updated, name) => {
    if (name === pickedColor) return updated;
    return [...updated, name];
  }, [] as AvatarColor[]);

  return [pickedColor, updatedColors];
};

export const pickAvatarName = (names: AvatarName[]): [AvatarName | undefined, AvatarName[]] => {
  if (!names.length) return [undefined, names];

  const index = randomInt(names.length - 1);
  const pickedName = names[index];

  const updatedNames = names.reduce((updated, name) => {
    if (name === pickedName) return updated;
    return [...updated, name];
  }, [] as AvatarName[]);

  return [pickedName, updatedNames];
};
