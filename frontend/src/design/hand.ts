interface HandProps {
  width: string;
  height: string;
  shadowSmallWidth: number;
  shadowLargeWidth: number;
  speed: number;
}

export const handProportion = (avatarName: string): HandProps => {
  switch (avatarName) {
    case "hand":
      return {
        width: "clamp(120px, 8.33vw + 40px, 200px)",
        height: "clamp(190px, 13.54vw + 60px, 320px)",
        shadowSmallWidth: 4,
        shadowLargeWidth: 8,
        speed: 3,
      };
    case "toy":
      return {
        width: "clamp(120px, 8.33vw + 40px, 200px)",
        height: "clamp(190px, 13.54vw + 60px, 320px)",
        shadowSmallWidth: 5,
        shadowLargeWidth: 7,
        speed: 3.5,
      };
    case "hook":
      return {
        width: "clamp(120px, 8.33vw + 40px, 200px)",
        height: "clamp(190px, 13.54vw + 60px, 320px)",
        shadowSmallWidth: 7,
        shadowLargeWidth: 10,
        speed: 2,
      };
    case "plastic":
      return {
        width: "clamp(120px, 8.33vw + 40px, 200px)",
        height: "clamp(190px, 13.54vw + 60px, 320px)",
        shadowSmallWidth: 7,
        shadowLargeWidth: 8,
        speed: 6,
      };
    case "scooper":
      return {
        width: "clamp(120px, 8.33vw + 40px, 200px)",
        height: "clamp(190px, 13.54vw + 60px, 320px)",
        shadowSmallWidth: 4,
        shadowLargeWidth: 5,
        speed: 5,
      };
    case "lobster":
      return {
        width: "clamp(120px, 8.33vw + 40px, 200px)",
        height: "clamp(190px, 13.54vw + 60px, 320px)",
        shadowSmallWidth: 5,
        shadowLargeWidth: 8,
        speed: 4.5,
      };
    case "skeleton":
      return {
        width: "clamp(120px, 8.33vw + 40px, 200px)",
        height: "clamp(190px, 13.54vw + 60px, 320px)",
        shadowSmallWidth: 3,
        shadowLargeWidth: 5,
        speed: 2.5
      };
    default:
      return {
        width: "clamp(120px, 8.33vw + 40px, 200px)",
        height: "clamp(190px, 13.54vw + 60px, 320px)",
        shadowSmallWidth: 7,
        shadowLargeWidth: 13,
        speed: 4,
      };
  }

};
