export const notifications = {
  againstYou: "against you...",

  playerIsOutOfTheMatchTitle: (loser: string) => `${loser} is out of the match`,
  playerIsOutOfTheMatchDescription: (loser: string) =>
    `${loser} has no dice and goes directly to the cemetery... Lets have a minute of silence on his regard!`,
  playerIsCallingExactOnYou: (activePlayer: string) => `${activePlayer} is calling exact, wait and see the result of this bold move!`,
  playerIsCallingBoloneyOnYou: (activePlayer: string) => `${activePlayer} is calling boloney against you... Good luck!`,
  idlePlayerCallingBoloney: (activeUsername: string, targetPlayer: string) =>
    `${activeUsername} is calling boloney against ${targetPlayer}...  Wait and see the result of this bold move!`,
};
