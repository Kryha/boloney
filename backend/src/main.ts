function InitModule(ctx: nkruntime.Context, logger: nkruntime.Logger, nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
  logger.info("JavaScript logic loaded.");

  initializer.registerRpc("roll-dice", rpcRollDice);
}
