interface HandProps {
  width: string;
  height: string;
  shadowSmallWidth: number;
  shadowLargeWidth: number;
  speed: number;
}

export const handSize = (avatarName: string): HandProps => {
  switch (avatarName) {
    case "hand":
      return {
        width: "clamp(9.38rem, 14.58vw + 0.63rem, 18.13rem)",
        height: "clamp(13.44rem, 20.31vw + 1.25rem, 25.63rem)",
        shadowSmallWidth: 4,
        shadowLargeWidth: 8,
        speed: 3,
      };
    case "toy":
      return {
        width: "clamp(9.38rem, 14.58vw + 0.63rem, 18.13rem)",
        height: "clamp(13.44rem, 20.31vw + 1.25rem, 25.63rem)",
        shadowSmallWidth: 5,
        shadowLargeWidth: 7,
        speed: 3.5,
      };
    case "hook":
      return {
        width: "clamp(9.38rem, 14.58vw + 0.63rem, 18.13rem)",
        height: "clamp(13.44rem, 20.31vw + 1.25rem, 25.63rem)",
        shadowSmallWidth: 7,
        shadowLargeWidth: 10,
        speed: 2,
      };
    case "plastic":
      return {
        width: "clamp(9.38rem, 14.58vw + 0.63rem, 18.13rem)",
        height: "clamp(13.44rem, 20.31vw + 1.25rem, 25.63rem)",
        shadowSmallWidth: 7,
        shadowLargeWidth: 8,
        speed: 6,
      };
    case "scooper":
      return {
        width: "clamp(9.38rem, 14.58vw + 0.63rem, 18.13rem)",
        height: "clamp(13.44rem, 20.31vw + 1.25rem, 25.63rem)",
        shadowSmallWidth: 4,
        shadowLargeWidth: 5,
        speed: 5,
      };
    case "lobster":
      return {
        width: "clamp(9.38rem, 14.58vw + 0.63rem, 18.13rem)",
        height: "clamp(13.44rem, 20.31vw + 1.25rem, 25.63rem)",
        shadowSmallWidth: 5,
        shadowLargeWidth: 8,
        speed: 4.5,
      };
    case "skeleton":
      return {
        width: "clamp(9.38rem, 14.58vw + 0.63rem, 18.13rem)",
        height: "clamp(13.44rem, 20.31vw + 1.25rem, 25.63rem)",
        shadowSmallWidth: 3,
        shadowLargeWidth: 5,
        speed: 2.5
      };
    default:
      return {
        width: "clamp(9.38rem, 14.58vw + 0.63rem, 18.13rem)",
        height: "clamp(13.44rem, 20.31vw + 1.25rem, 25.63rem)",
        shadowSmallWidth: 7,
        shadowLargeWidth: 13,
        speed: 4,
      };
  }

};
