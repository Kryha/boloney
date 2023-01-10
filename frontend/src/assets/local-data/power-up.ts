import { Coup, DoubleUp, Grill, GuardTower, Hypnosis, MenageATrois, SecondChance, SmokeAndMirrors, Vendetta } from "../images";
import { PowerUp, PowerUpId } from "../../types";

// TODO: Update descriptions
export const POWER_UP_DATA: Record<PowerUpId, PowerUp> = {
  "1": {
    id: "1",
    name: "grill",
    shortDescription: "ask an opponent if they have x of y die faces.",
    longDescription: "ask an opponent if they have x of y die faces.",
    cardImage: Grill,
    isImageLarge: true,
  },
  "2": {
    id: "2",
    name: "bird's Eye View",
    shortDescription: "ask target opponent what the sum of their dice are.",
    longDescription: "ask target opponent what the sum of their dice are.",
    cardImage: GuardTower,
    isImageLarge: false,
  },
  "3": {
    id: "3",
    name: "ménage à Trois",
    shortDescription: "roll 3 extra dice to use this turn only.",
    longDescription: "roll 3 extra dice to use this turn only.",
    cardImage: MenageATrois,
    isImageLarge: false,
  },
  "4": {
    id: "4",
    name: "double up",
    shortDescription: "draw 2 extra cards.",
    longDescription: "draw 2 extra cards.",
    cardImage: DoubleUp,
    isImageLarge: true,
  },
  "5": {
    id: "5",
    name: "vendetta",
    shortDescription: "an opponent reveals their hand of cards to you, they can't play cards for the rest of the round.",
    longDescription: "an opponent reveals their hand of cards to you, they can't play cards for the rest of the round.",
    cardImage: Vendetta,
    isImageLarge: true,
  },
  "6": {
    id: "6",
    name: "second chance",
    shortDescription: "you may re-roll any number of your dice.",
    longDescription: "you may re-roll any number of your dice.",
    cardImage: SecondChance,
    isImageLarge: false,
  },
  "7": {
    id: "7",
    name: "coup",
    shortDescription: "target player discards all their cards, then the player taking the action draws that many cards.",
    longDescription: "target player discards all their cards, then the player taking the action draws that many cards.",
    cardImage: Coup,
    isImageLarge: true,
  },
  "8": {
    id: "8",
    name: "smoke and Mirrors",
    shortDescription: "shuffle players order then skip your turn.",
    longDescription: "shuffle players order then skip your turn.",
    cardImage: SmokeAndMirrors,
    isImageLarge: false,
  },
  "9": {
    id: "9",
    name: "hypnosis",
    shortDescription: "target opponent reveals their hand to you, you choose one of their cards to gain to your hand.",
    longDescription: "target opponent reveals their hand to you, you choose one of their cards to gain to your hand.",
    cardImage: Hypnosis,
    isImageLarge: true,
  },
};
