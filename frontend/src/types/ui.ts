import { z } from "zod";

export const overlayComponentSchema = z.enum([
  "sausage-spinner",
  "power-up-list",
  "power-up-use",
  "match-settings-overview",
  "power-up-list-description",
]);

export type OverlayComponent = z.infer<typeof overlayComponentSchema>;

export const turnActionSchema = z.enum(["powerUp", "healDice", "bid", "boloney", "exact"]);
export type TurnAction = z.infer<typeof turnActionSchema>;

export const turnActionStepSchema = z.enum(["pickAction", "proceedWithAction", "evaluateWinner", "results"]);
export type TurnActionStep = z.infer<typeof turnActionStepSchema>;
