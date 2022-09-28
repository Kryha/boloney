//TO-DO: Check how to import this library
//import * as dotenvFlow from "dotenv-flow";
//dotenvFlow.config();

import { beforeAuthenticateCustom, afterAuthenticateCustom } from "./hooks/auth";
import { matchInit, matchJoin, matchJoinAttempt, matchLeave, matchLoop, matchSignal, matchTerminate } from "./game-modes/standard";
import { matchmakerMatched } from "./services/match-maker";

function InitModule(_ctx: nkruntime.Context, logger: nkruntime.Logger, _nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
  initializer.registerMatch("standard", {
    matchInit,
    matchJoinAttempt,
    matchJoin,
    matchLeave,
    matchLoop,
    matchSignal,
    matchTerminate,
  });
  initializer.registerBeforeAuthenticateCustom(beforeAuthenticateCustom);
  initializer.registerAfterAuthenticateCustom(afterAuthenticateCustom);
  initializer.registerMatchmakerMatched(matchmakerMatched);
  logger.info("JavaScript logic loaded.");
}
// Reference InitModule to avoid it getting removed on build
!InitModule && InitModule.bind(null);
