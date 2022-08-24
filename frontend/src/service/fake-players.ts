// TODO: delete this file
import { Player } from "../interfaces/player";
import {
  Hand,
  HookHand,
  LobsterHand,
  PlasticHand,
  ScooperHand,
  ToyHand
} from "../assets/images";

export const Players: Player[] = [
  {
    name: "umpalumpa",
    color: "#FFC300",
    avatar: ToyHand,
  },
  {
    name: "señor.garfio",
    color: "#FF8059",
    avatar: HookHand,
  },
  {
    name: "shake.it",
    color: "#FFA7E9",
    avatar: PlasticHand,
  },
  {
    name: "something.great",
    color: "#989EFF",
    avatar: ScooperHand,
  },
  {
    name: "god",
    color: "#92C9FF",
    avatar: Hand,
  },
  {
    name: "lekker",
    color: "#91C342",
    avatar: LobsterHand,
  }
];
