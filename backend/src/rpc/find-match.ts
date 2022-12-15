import { errors } from "../services";
import { rpcHandler } from "./rpc-utils";

export const findMatch = rpcHandler((ctx, logger, nk, _payload) => {
  if (!ctx.userId) throw errors.noIdInContext;

  const matches = nk.matchList(11, true);
  logger.debug(`Match List: ${JSON.stringify(matches)}`);

  const matchIds = matches?.map((m) => m.matchId);

  return JSON.stringify({ match_ids: matchIds });
});
