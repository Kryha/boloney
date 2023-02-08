import "core-js/stable";

import { beforeAuthenticateCustom, afterAuthenticateCustom } from "./hooks/auth";
import {
  matchInit,
  matchJoin,
  matchJoinAttempt,
  matchLeave,
  matchLoop,
  matchmakerMatched,
  matchSignal,
  matchTerminate,
} from "./game-modes/standard";
import { rollDice, createMatch, findMatch, rtBeforeChannelMessageSend } from "./rpc";
import { MatchState } from "./types";

function InitModule(_ctx: nkruntime.Context, logger: nkruntime.Logger, _nk: nkruntime.Nakama, initializer: nkruntime.Initializer) {
  initializer.registerMatch<MatchState>("standard", {
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
  initializer.registerRpc("create_match", createMatch);
  initializer.registerRpc("find_match", findMatch);

  // realtime registration
  initializer.registerRtBefore("ChannelMessageSend", rtBeforeChannelMessageSend);

  logger.info("JavaScript logic loaded.");
}

// Reference InitModule to avoid it getting removed on build
!InitModule && InitModule.bind(null);
