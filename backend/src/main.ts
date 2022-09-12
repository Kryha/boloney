import { getDiceRoll } from "./roll-dice";

function InitModule(_ctx: nkruntime.Context, logger: nkruntime.Logger, _nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
  logger.info("JavaScript logic loaded.");

  initializer.registerRpc("roll-dice", getDiceRoll);
}
// Reference InitModule to avoid it getting removed on build
!InitModule && InitModule.bind(null);
