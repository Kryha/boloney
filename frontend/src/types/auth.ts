import { z } from "zod";

import { ADDRESS_LENGTH, ADDRESS_PREFIX, PRIVATE_KEY_LENGTH, PRIVATE_KEY_PREFIX, VIEW_KEY_LENGTH, VIEW_KEY_PREFIX } from "../constants";

export const aleoAccountSchema = z.object({
  privateKey: z.string().length(PRIVATE_KEY_LENGTH).startsWith(PRIVATE_KEY_PREFIX),
  viewKey: z.string().length(VIEW_KEY_LENGTH).startsWith(VIEW_KEY_PREFIX),
  address: z.string().length(ADDRESS_LENGTH).startsWith(ADDRESS_PREFIX),
});

export type AleoAccount = z.infer<typeof aleoAccountSchema>;

export interface AuthFields {
  username: string;
  password: string;
}
