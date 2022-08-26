function InitModule(_ctx: nkruntime.Context, logger: nkruntime.Logger, _nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
  logger.info("JavaScript logic loaded.");

  initializer.registerRpc("roll-dice", getDiceRoll);
}
