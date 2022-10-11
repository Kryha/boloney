import { MatchSettings } from "./match-settings";

// TODO: define and handle types with Zod
export interface MatchState extends MatchSettings {
  presences: object;
  emptyTicks: number;
}
