import { MatchSettings } from "./match-settings";

export interface MatchState extends MatchSettings {
  presences: object;
  emptyTicks: number;
}
