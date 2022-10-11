// TODO: give a proper name to these cases
export type PowerupType = "interrogate" | "satellite image" | "reinforce" | "reconnaissance" | "sabotage" | "regroup" | "coup d'etat" | "diversion" | "defection";

export interface Die {
  rolledValue: number;
}

export interface PowerUp {
  name: PowerupType;
  image: string;
}
