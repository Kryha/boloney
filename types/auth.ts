import { z } from "zod";

export const accountKeysSchema = z.object({
  privateKey: z.string(),
  viewKey: z.string(),
  address: z.string(),
});

export type AccountKeys = z.infer<typeof accountKeysSchema>;
