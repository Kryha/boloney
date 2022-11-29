import { z } from "zod";

import { MAX_DIE_FACE, MIN_DIE_FACE } from "../constants";

// payload that is sent by the frontend when placing a bid
export const bidPayloadFrontendSchema = z.object({
  face: z.number().min(MIN_DIE_FACE).max(MAX_DIE_FACE),
  amount: z.number().min(1),
});

export type BidPayloadFrontend = z.infer<typeof bidPayloadFrontendSchema>;

export const bidSchema = bidPayloadFrontendSchema.extend({
  createdAt: z.number(),
});

export type Bid = z.infer<typeof bidSchema>;

// payload dispatched by the backend after a bid gets processed
export const bidPayloadBackendSchema = z.record(bidSchema);

export type BidPayloadBackend = z.infer<typeof bidPayloadBackendSchema>;

export const bidWithUserIdSchema = bidSchema.extend({ userId: z.string() });

export type BidWithUserId = z.infer<typeof bidWithUserIdSchema>;
