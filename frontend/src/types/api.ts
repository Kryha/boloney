import { z } from "zod";

import { NkError } from "./error";
import { playerPublicSchema } from "./match";

export type NkResponse<T = void> = NkError | T;

export const playerJoinedPayloadSchema = z.object({
  players: z.record(playerPublicSchema),
  playerOrder: z.array(z.string()),
});

export type PlayerJoinedPayload = z.infer<typeof playerJoinedPayloadSchema>;

export const boloneyPayloadBackendSchema = z.object({
  players: z.record(playerPublicSchema),
});

export type BoloneyPayloadBackend = z.infer<typeof boloneyPayloadBackendSchema>;
