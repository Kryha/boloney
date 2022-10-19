import { z } from "zod";

export const powerUpTypeSchema = z.enum(["p1", "p2", "p3", "p4"]);

export type PowerupType = z.infer<typeof powerUpTypeSchema>;
