import { PowerUpId } from "../../types";
import { powerUpRequiresTarget } from "../../util";

export const notifications = {
  againstYou: "against you...",
  playerIsDead: "DEAD!",
  grill: "GRILL!",
  birdsEyeView: "BIRD'S EYE VIEW",
  vendetta: "VENDETTA",
  coup: "COUP",
  hypnosys: "HYPNOSYS",
  menageATrois: "MENAGE A TROIS",
  secondChance: "SECOND CHANCE",
  doubleUp: "DOUBLE UP",
  smokeAndMirrors: "SMOKE AND MIRRORS",

  playerIsOutOfTheMatchTitle: (loser: string) => `${loser} is out of the match`,
  playerIsOutOfTheMatchDescription: (loser: string) =>
    `${loser} lost their last dice and goes directly to the cemetery... Let's have a minute of silence!`,
  playerIsCallingExactOnYou: (activePlayer: string) =>
    `${activePlayer} thinks they’re on the money with this call. Patience, young one. Your time to shine approaches.`,
  playerIsCallingBoloneyOnYou: (activePlayer: string) =>
    `${activePlayer} smells a bluff from you. Patience, young one. Your time to shine approaches.`,
  idlePlayerCallingBoloney: (activeUsername: string, targetPlayer: string) =>
    `${activeUsername} smells a bluff from ${targetPlayer}. Patience, young one. Your time to shine approaches.`,
  playerLeftTheMatch: (player: string) => `${player} left the match...`,
  playerIsSpreadingShockwaves: (id: PowerUpId, localPlayerName: string, callerName: string, targetName?: string | null) => {
    if (powerUpRequiresTarget(id)) {
      return `${callerName} is spreading shockwaves with a power-up against ${localPlayerName === targetName ? "you" : targetName
        }. Patience, young one. Your time to shine approaches.`;
    } else {
      return `${callerName} is spreading shockwaves with a power-up. Patience, young one. Your time to shine approaches.`;
    }
  },
  playerIsUsingHealDice: (activePlayer: string) => `I'm back, baby! ${activePlayer} traded in power-ups to get back a die.`,
};
