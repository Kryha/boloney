//TO-DO: Check how to import this library
//import * as dotenvFlow from "dotenv-flow";
//dotenvFlow.config();

import { beforeAuthenticateCustom, afterAuthenticateCustom } from "./hooks/auth";
import { matchInit, matchJoin, matchJoinAttempt, matchLeave, matchLoop, matchSignal, matchTerminate } from "./game-modes/standard";
import { rollDice, findMatch } from "./rpc";
import { matchmakerMatched } from "./services/match-maker";
// import { beforeMatchmakerAdd } from "./hooks/matchmaker";

function InitModule(_ctx: nkruntime.Context, logger: nkruntime.Logger, _nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
  initializer.registerMatch("standard", {
    // match registration
    matchInit,
    matchJoinAttempt,
    matchJoin,
    matchLeave,
    matchLoop,
    matchSignal,
    matchTerminate,
  });

  // hooks registration
  initializer.registerBeforeAuthenticateCustom(beforeAuthenticateCustom);
  initializer.registerAfterAuthenticateCustom(afterAuthenticateCustom);
  // initializer.registerRtBefore("MatchmakerAdd", beforeMatchmakerAdd);
  initializer.registerMatchmakerMatched(matchmakerMatched);

  // rpc registration
  initializer.registerRpc("roll_dice", rollDice);
  initializer.registerRpc("find_match", findMatch);

  logger.info("JavaScript logic loaded.");
}
// Reference InitModule to avoid it getting removed on build
!InitModule && InitModule.bind(null);
