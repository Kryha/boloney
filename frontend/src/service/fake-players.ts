// TODO: delete this file
import { Player } from "../interfaces/player";
import {
  Hand,
  HookHand,
  LobsterHand,
  PlasticHand,
  ScooperHand,
  SkeletonHand,
  ToyHand,
} from "../assets/images";

export const Players: Player[] = [
  {
    id: "1",
    name: "umpalumpa",
    color: "#FFC300",
    avatar: ToyHand,
  },
  {
    id: "2",
    name: "señor.garfio",
    color: "#FF8059",
    avatar: HookHand,
  },
  {
    id: "3",
    name: "shake.it",
    color: "#FFA7E9",
    avatar: PlasticHand,
  },
  {
    id: "4",
    name: "something.great",
    color: "#989EFF",
    avatar: ScooperHand,
  },
  {
    id: "5",
    name: "god",
    color: "#92C9FF",
    avatar: Hand,

  },
  {
    id: "6",
    name: "lekker (you)",
    color: "#91C342",
    avatar: LobsterHand,
  },
  {
    id: "7",
    name: "yoda",
    color: "#91C342",
    avatar: SkeletonHand,

  }
];
