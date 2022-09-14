// TODO: delete this file
import { Player } from "../interfaces/player";
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
  ToyHandPaint
} from "../assets/images";

export const Players: Player[] = [
  {
    id: "1",
    name: "umpalumpa",
    color: "#FFC300",
    avatar: ToyHand,
    avatarName: "toy",
    paint: ToyHandPaint,
    connected: true,
  },
  {
    id: "2",
    name: "señor.garfio",
    color: "#FF8059",
    avatar: HookHand,
    avatarName: "hook",
    paint: HookHandPaint,
    connected: false,
  },
  {
    id: "3",
    name: "shake.it",
    color: "#FFA7E9",
    avatar: PlasticHand,
    avatarName: "plastic",
    paint: PlasticHandPaint,
    connected: true,
  },
  {
    id: "4",
    name: "something.great",
    color: "#989EFF",
    avatar: ScooperHand,
    avatarName: "scooper",
    paint: ScooperHandPaint,
    connected: false,
  },
  {
    id: "5",
    name: "god",
    color: "#92C9FF",
    avatar: Hand,
    avatarName: "hand",
    paint: HandPaint,
    connected: true,
  },
  {
    id: "6",
    name: "lekker (you)",
    color: "#91C342",
    avatar: LobsterHand,
    avatarName: "lobster",
    paint: LobsterHandPaint,
    connected: true,
  },
  {
    id: "7",
    name: "yoda",
    color: "#91C342",
    avatar: SkeletonHand,
    avatarName: "skeleton",
    paint: SkeletonHandPaint,
    connected: false,
  }
];
