function rpcRollDice(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, payload: string): string {
  logger.info("Dice is rolled rpc is called");
  return JSON.stringify({ throw: Math.floor(Math.random() * 6) + 1, success: true });
}
