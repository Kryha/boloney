import { error } from "../text";
import { MatchSettings } from "../types";
import { handleError, rpcHandler } from "../utils";

export const createMatch = rpcHandler((ctx, logger, nk, payload) => {
  if (!ctx.userId) throw handleError(error.noIdInContext, logger);
  if (!payload) throw handleError(error.noPayload, logger);

  logger.debug("PAYLOAD:", payload);

  // const matchSettings = matchSettingsSchema.parse(JSON.parse(payload));

  // const matchSettings = matchSettingsSchema.safeParse(JSON.parse(payload));

  // if (!matchSettings.success) {
  //   const { message } = matchSettings.error.errors[0];
  //   logger.debug("PARSE FAILED");
  //   throw message;
  // }

  // TODO: parse properly
  const matchSettings: MatchSettings = JSON.parse(payload);

  // const matchSettings = JSON.parse(payload);
  logger.debug("Match Settings:", matchSettings);

  const matchId = nk.matchCreate("standard", matchSettings);

  return JSON.stringify({ match_id: matchId });
});
