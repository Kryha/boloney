import { DiceFiveIcon, DiceFourIcon, DiceOneIcon, DiceSixIcon, DiceThreeIcon, DiceTwoIcon } from "../assets";

export const findDieFace = (value: number) => {
  switch (value) {
    case 1:
      return <DiceOneIcon />;
    case 2:
      return <DiceTwoIcon />;
    case 3:
      return <DiceThreeIcon />;
    case 4:
      return <DiceFourIcon />;
    case 5:
      return <DiceFiveIcon />;
    case 6:
      return <DiceSixIcon />;
    default:
      return <DiceOneIcon />;
  }
};
