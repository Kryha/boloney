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
  SausageHand,
  SausageHandPaint,
  GraveStone,
} from "../assets";

export interface HandProps {
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
        shadowSmallWidth: 2.5,
        shadowLargeWidth: 2.5,
        speed: 3,
        avatar: Hand,
        paint: HandPaint,
      };
    case "sausage":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 2.5,
        shadowLargeWidth: 2.5,
        speed: 3.5,
        avatar: SausageHand,
        paint: SausageHandPaint,
      };
    case "hook":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 2.5,
        shadowLargeWidth: 2.5,
        speed: 2,
        avatar: HookHand,
        paint: HookHandPaint,
      };
    case "plastic":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 3.5,
        shadowLargeWidth: 3.5,
        speed: 6,
        avatar: PlasticHand,
        paint: PlasticHandPaint,
      };
    case "scooper":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 4,
        shadowLargeWidth: 4,
        speed: 5,
        avatar: ScooperHand,
        paint: ScooperHandPaint,
      };
    case "lobster":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 3.3,
        shadowLargeWidth: 3.3,
        speed: 4.5,
        avatar: LobsterHand,
        paint: LobsterHandPaint,
      };
    case "skeleton":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 3.2,
        shadowLargeWidth: 3.2,
        speed: 2.5,
        avatar: SkeletonHand,
        paint: SkeletonHandPaint,
      };
    case "grave":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 3.2,
        shadowLargeWidth: 3.2,
        speed: 2.5,
        avatar: GraveStone,
        paint: GraveStone,
      };
    default:
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 2.5,
        shadowLargeWidth: 2.5,
        speed: 4,
        avatar: SkeletonHand,
        paint: SkeletonHandPaint,
      };
  }
};

export const handSizeLeaderboard = {
  height: "6.5rem",
  width: "6.5rem",
};
