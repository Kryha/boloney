export const notifications = {
  againstYou: "against you...",

  playerIsOutOfTheMatchTitle: (loser: string) => `${loser} is out of the match`,
  playerIsOutOfTheMatchDescription: (loser: string) =>
    `${loser} has no dice and goes directly to the cemetery... Lets have a minute of silence on his regard!`,
  playerIsCallingExactOnYou: (activePlayer: string) => `${activePlayer} is calling exact, wait and see the result of this bold move!`,
  playerIsHealingADie: (activePlayer: string) =>
    `i’m back, baby! ${activePlayer} traded in power-ups to get back a die. Patience, young one. Your time to shine approaches.`,
  playerIsCallingBoloneyOnYou: (activePlayer: string) => `${activePlayer} is calling boloney against you... Good luck!`,
  idlePlayerCallingBoloney: (activeUsername: string, targetPlayer: string) =>
    `${activeUsername} is calling boloney against ${targetPlayer}...  Wait and see the result of this bold move!`,
  playerLeftTheMatch: (player: string) => `${player} left the match...`,
};
