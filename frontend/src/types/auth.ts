import { z } from "zod";
import { ADDRESS_LENGTH, ADDRESS_PREFIX, PRIVATE_KEY_LENGTH, PRIVATE_KEY_PREFIX, VIEW_KEY_LENGTH, VIEW_KEY_PREFIX } from "../constants";

// TODO: check for length and prefix
export const accountKeysSchema = z.object({
  privateKey: z.string().length(PRIVATE_KEY_LENGTH).startsWith(PRIVATE_KEY_PREFIX),
  viewKey: z.string().length(VIEW_KEY_LENGTH).startsWith(VIEW_KEY_PREFIX),
  address: z.string().length(ADDRESS_LENGTH).startsWith(ADDRESS_PREFIX),
});

export type AccountKeys = z.infer<typeof accountKeysSchema>;

export interface AuthFields {
  username: string;
  password: string;
}
