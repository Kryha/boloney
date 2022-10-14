// TODO: convert to zod
export type PowerUpType = "interrogate" | "satelliteImage" | "reinforce" | "reconnaissance" | "sabotage" | "regroup" | "coupDetat" | "diversion" | "defection";

export interface Die {
  rolledValue: number;
}

// TODO: update type
export interface PowerUp {
  id: string;
  name: PowerUpType;
  image: string;
}
