import { z } from "zod";

import { HASH_CHAIN_LENGTH } from "../constants";

export const hashChainSchema = z.array(z.string()).length(HASH_CHAIN_LENGTH);
export type HashChain = z.infer<typeof hashChainSchema>;

export const getHashChainResSchema = z.object({
  seed: z.number(),
  hashChain: hashChainSchema,
});
export type GetHashChainRes = z.infer<typeof getHashChainResSchema>;
