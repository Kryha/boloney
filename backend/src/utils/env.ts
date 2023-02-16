export const env = (ctx: nkruntime.Context) => ({
  ZK_ENABLED: ctx.env.ZK_ENABLED === "true" ? true : false,
});
