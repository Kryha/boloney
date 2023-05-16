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
  speed: number;
  paint: string;
  avatar: string;
  smallShadowWidth: number;
  largeShadowWidth: number;

  // TODO: delete
  shadowSmallWidth: number;
  shadowLargeWidth: number;
}

export const handProportion = (avatarName: string): HandProps => {
  switch (avatarName) {
    case "hand":
      return {
        width: "clamp(90px, 11.46vw + -20px, 200px)",
        height: "clamp(40px, 5.21vw + -10px, 90px)",
        shadowSmallWidth: 2.5,
        shadowLargeWidth: 2.5,
        smallShadowWidth: 10,
        largeShadowWidth: 40,
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
        smallShadowWidth: 10,
        largeShadowWidth: 40,
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
        smallShadowWidth: 10,
        largeShadowWidth: 40,
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
        smallShadowWidth: 10,
        largeShadowWidth: 40,
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
        smallShadowWidth: 10,
        largeShadowWidth: 40,
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
        smallShadowWidth: 10,
        largeShadowWidth: 40,
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
        smallShadowWidth: 10,
        largeShadowWidth: 40,
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
        smallShadowWidth: 10,
        largeShadowWidth: 40,
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
        smallShadowWidth: 10,
        largeShadowWidth: 40,
      };
  }
};

export const handSizeLeaderboard = {
  height: "6.5rem",
  width: "6.5rem",
};
