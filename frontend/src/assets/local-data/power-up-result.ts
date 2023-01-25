import { PowerUpId } from "../../types";

interface PowerUpResult {
  heading1?: string;
  heading2?: string;
}

export const powerUpResult = (id: PowerUpId, targetedPlayer?: string): PowerUpResult => {
  switch (id) {
    case "4":
      return {
        heading1: "get 2 extra power-ups!",
        heading2: "find your 2 new extra power-ups!",
      };
    case "5":
      return {
        heading1: `${targetedPlayer} power-ups`,
        heading2: "find their hidden power-ups!",
      };
    case "9":
      return {
        heading1: "take a power-up!",
        heading2: "which one do you want to steal?",
      };
    default:
      return {
        heading1: "get 2 extra power-ups!",
        heading2: "find your 2 new extra power-ups!",
      };
  }
};
