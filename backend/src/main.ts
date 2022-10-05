import { beforeAuthenticateCustom, afterAuthenticateCustom } from "./hooks/auth";
import { matchInit, matchJoin, matchJoinAttempt, matchLeave, matchLoop, matchSignal, matchTerminate } from "./game-modes/standard";
import { rollDice, findMatch } from "./rpc";
import { matchmakerMatched } from "./services/match-maker";
import { env } from "./utils";

function InitModule(ctx: nkruntime.Context, logger: nkruntime.Logger, _nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
  env.init(ctx);

  // match registration
  initializer.registerMatch("standard", {
    matchInit,
    matchJoinAttempt,
    matchJoin,
    matchLoop,
    matchTerminate,
    matchLeave,
    matchSignal,
  });

  // hooks registration
  initializer.registerBeforeAuthenticateCustom(beforeAuthenticateCustom);
  initializer.registerAfterAuthenticateCustom(afterAuthenticateCustom);
  initializer.registerMatchmakerMatched(matchmakerMatched);

  // rpc registration
  initializer.registerRpc("roll_dice", rollDice);
  initializer.registerRpc("find_match", findMatch);

  logger.info("JavaScript logic loaded.");
}
// Reference InitModule to avoid it getting removed on build
!InitModule && InitModule.bind(null);
