export const param = {
  yourDice: (amount: number) => `your dice (x${amount})`,
  yourPowerUp: (amount: number) => `your power-up (x${amount})`,
  lessThanTenSeconds: (seconds: number) => `0${seconds}`,
  amountXOfDice: (amount: number) => `x${amount}`,
  players: (amount: number) => `${amount} ${amount === 1 ? "player" : "players"}`,
  dice: (amount: number) => `${amount} ${amount === 1 ? "die" : "dice"}`,
  powerUps: (amount: number) => `${amount} ${amount === 1 ? "power-up" : "power-ups"}`,
  matchStatusItemNumber: (amount: number) => `${amount === undefined ? "?" : amount}`,
  round: (amount: number) => `${amount === 1 ? "round" : "rounds"}`,
  drawPowerUpsRound: (amount: number) => `+${amount}`,
  healAmount: (amount: number) => (amount === 1 ? `x${amount} power-up` : `x${amount} power-ups`),
  xAmount: (amount: number) => `x${amount}`,
};
