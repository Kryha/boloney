// TODO: convert to zod
export type PowerUpType = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export interface Die {
  rolledValue: number;
}

// TODO: update type
export interface PowerUp {
  id: string;
  type: PowerUpType
  name: string;
  image: string;
}
