import {
  Hand,
  HandPaint,
  HookHand,
  HookHandPaint,
  LobsterHand,
  LobsterHandPaint,
  PlasticHand,
  PlasticHandPaint,
  ScooperHand,
  ScooperHandPaint,
  SkeletonHand,
  SkeletonHandPaint,
  ToyHand,
  ToyHandPaint,
} from "../assets";

interface HandProps {
  width: string;
  height: string;
  shadowSmallWidth: number;
  shadowLargeWidth: number;
  speed: number;
  paint: string;
  avatar: string;
}

export const handProportion = (avatarName: string): HandProps => {
  switch (avatarName) {
    case "hand":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 4,
        shadowLargeWidth: 8,
        speed: 3,
        avatar: Hand,
        paint: HandPaint,
      };
    case "toy":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 5,
        shadowLargeWidth: 7,
        speed: 3.5,
        avatar: ToyHand,
        paint: ToyHandPaint,
      };
    case "hook":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 7,
        shadowLargeWidth: 10,
        speed: 2,
        avatar: HookHand,
        paint: HookHandPaint,
      };
    case "plastic":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 7,
        shadowLargeWidth: 8,
        speed: 6,
        avatar: PlasticHand,
        paint: PlasticHandPaint,
      };
    case "scooper":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 4,
        shadowLargeWidth: 5,
        speed: 5,
        avatar: ScooperHand,
        paint: ScooperHandPaint,
      };
    case "lobster":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 5,
        shadowLargeWidth: 8,
        speed: 4.5,
        avatar: LobsterHand,
        paint: LobsterHandPaint,
      };
    case "skeleton":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 3,
        shadowLargeWidth: 5,
        speed: 2.5,
        avatar: SkeletonHand,
        paint: SkeletonHandPaint,
      };
    default:
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 7,
        shadowLargeWidth: 13,
        speed: 4,
        avatar: SkeletonHand,
        paint: SkeletonHandPaint,
      };
  }
};
