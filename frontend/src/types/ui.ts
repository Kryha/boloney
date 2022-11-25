import { z } from "zod";

export const overlayComponentSchema = z.enum(["sausage-spinner", "power-up-list", "match-settings-overview"]);

export type OverlayComponent = z.infer<typeof overlayComponentSchema>;
