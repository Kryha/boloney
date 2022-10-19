import { CoupDEtatIcon, DefectionIcon, DiversionIcon, InterrogateIcon, ReconnaissanceIcon, RegroupIcon, ReinforceIcon, SabotageIcon, SatelliteIcon } from "../images";
import { PowerUpType } from "../../interfaces";

interface PowerUpDataProps {
  id: PowerUpType;
  name: string;
  shortDescription: string;
  longDescription: string;
  iconImage: string;
  cardImage: string;
}

// TODO: Update info
export const POWER_UP_DATA: PowerUpDataProps[] = [
  {
    id: "1",
    name: "interrogate",
    shortDescription: "ask an opponent if they have x of y die faces.",
    longDescription: "ask an opponent if they have x of y die faces.",
    iconImage: InterrogateIcon,
    cardImage: InterrogateIcon,
  },
  {
    id: "2",
    name: "satelliteImage",
    shortDescription: "ask target opponent what the sum of their dice are.",
    longDescription: "ask target opponent what the sum of their dice are.",
    iconImage: SatelliteIcon,
    cardImage: SatelliteIcon,
  },
  {
    id: "3",
    name: "reinforce",
    shortDescription: "roll 3 extra dice to use this turn only.",
    longDescription: "roll 3 extra dice to use this turn only.",
    iconImage: ReinforceIcon,
    cardImage: ReinforceIcon,
  },
  {
    id: "4",
    name: "reconnaissance",
    shortDescription: "draw 2 extra cards.",
    longDescription: "draw 2 extra cards.",
    iconImage: ReconnaissanceIcon,
    cardImage: ReconnaissanceIcon,
  },
  {
    id: "5",
    name: "sabotage",
    shortDescription: "an opponent reveals their hand of cards to you, they can't play cards for the rest of the round.",
    longDescription: "an opponent reveals their hand of cards to you, they can't play cards for the rest of the round.",
    iconImage: SabotageIcon,
    cardImage: SabotageIcon,
  },
  {
    id: "6",
    name: "regroup",
    shortDescription: "you may re-roll any number of your dice.",
    longDescription: "you may re-roll any number of your dice.",
    iconImage: RegroupIcon,
    cardImage: RegroupIcon,
  },
  {
    id: "7",
    name: "coupDetat",
    shortDescription: "target player discards all their cards, then the player taking the action draws that many cards.",
    longDescription: "target player discards all their cards, then the player taking the action draws that many cards.",
    iconImage: CoupDEtatIcon,
    cardImage: CoupDEtatIcon,
  },
  {
    id: "8",
    name: "diversion",
    shortDescription: "shuffle players order then skip your turn.",
    longDescription: "shuffle players order then skip your turn.",
    iconImage: DiversionIcon,
    cardImage: DiversionIcon,
  },
  {
    id: "9",
    name: "defection",
    shortDescription: "target opponent reveals their hand to you, you choose one of their cards to gain to your hand.",
    longDescription: "target opponent reveals their hand to you, you choose one of their cards to gain to your hand.",
    iconImage: DefectionIcon,
    cardImage: DefectionIcon,
  },
];
