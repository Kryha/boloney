import { PowerUpId } from "../../types";
import { powerUpRequiresTarget } from "../../util";

export const notifications = {
  againstYou: "against you...",
  playerIsDead: "DEAD!",
  grill: "GRILL!",
  birdsEyeView: "BIRD'S EYE VIEW",
  vendetta: "VENDETTA",
  coup: "COUP",
  hypnosis: "HYPNOSIS",
  menageATrois: "MENAGE A TROIS",
  secondChance: "SECOND CHANCE",
  doubleUp: "DOUBLE UP",
  smokeAndMirrors: "SMOKE AND MIRRORS",

  playerIsOutOfTheMatchTitle: (loser: string) => `${loser} is out of the match`,
  playerIsOutOfTheMatchDescription: (loser: string) =>
    `${loser} lost their last dice and goes directly to the cemetery... Let's have a minute of silence!`,
  playerIsCallingExactOnYou: (activePlayer: string) => `${activePlayer} thinks they’re on the money with this call.`,
  playerIsCallingBoloneyOnYou: (activePlayer: string) => `${activePlayer} smells a bluff from you.`,
  idlePlayerCallingBoloney: (activeUsername: string, targetPlayer: string) => `${activeUsername} smells a bluff from ${targetPlayer}.`,
  playerLeftTheMatch: (player: string) => `${player} left the match...`,
  playerIsSpreadingShockwaves: (id: PowerUpId, localPlayerName: string, callerName: string, targetName?: string | null) => {
    if (powerUpRequiresTarget(id)) {
      return `${callerName} is feeling their power with a power-up against ${localPlayerName === targetName ? "you" : targetName}.`;
    } else {
      return `${callerName} is feeling their power with a power-up.`;
    }
  },
  playerIsUsingHealDice: (activePlayer: string) => `I'm back, baby! ${activePlayer} traded in power-ups to get back a die.`,
};
