import { error } from "../text";
import { logError, rpcHandler } from "../utils/error-handling";

export const findMatch = rpcHandler((ctx, logger, nk, _payload) => {
  if (!ctx.userId) throw logError(error.noIdInContext, logger);

  const matches = nk.matchList(11, true);
  logger.debug(`Match List: ${JSON.stringify(matches)}`);

  const matchIds = matches?.map((m) => m.matchId);

  return JSON.stringify({ match_ids: matchIds });
});
