export const createChatGroup = async (nk: nkruntime.Nakama, ctx: nkruntime.Context, logger: nkruntime.Logger) => {
  try {
    await nk.groupCreate(ctx.userId, ctx.matchId, "", "en", "Game chat", null, true);
  } catch (error) {
    logger.debug("Chat creation failed", error);
  }
};
