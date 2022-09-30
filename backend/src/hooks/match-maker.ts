export const onMatchmakerMatched: nkruntime.MatchmakerMatchedFunction = (
  ctx: nkruntime.Context,
  logger: nkruntime.Logger,
  nk: nkruntime.Nakama,
  matches: nkruntime.MatchmakerResult[]
): string => {
  logger.info("NEW MATCH CREATED");

  const matchId = nk.matchCreate("standard", { invited: matches });
  logger.info(`Match Id -> ${matchId}`);
  logger.info(`Players in match -> ${matches}`);
  return matchId;
};
