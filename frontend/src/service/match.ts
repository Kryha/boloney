import { MatchData } from "@heroiclabs/nakama-js";
import { useState } from "react";
import { text } from "../assets";
import { useAuthState } from "../store";
import { useMatchState } from "../store/match";
import { MatchOpCode, RoundStage } from "../types";

// ask about error handling
export const useMatch = () => {
  const socket = useAuthState((state) => state.socket);
  const setRoundStage = useMatchState((state) => state.setRoundStage);
  const roundStage = useMatchState((state) => state.roundStage);
  const isMatchStageReady = useMatchState((state) => state.isMatchStageReady);
  const [isLoading, setIsLoading] = useState(false);

  if (!socket) throw new Error(text.error.noSocketConnected);

  socket.onmatchdata = (matchData: MatchData) => {
    switch (matchData.op_code) {
      case MatchOpCode.STAGE_TRANSITION:
        // setRoundStage(matchData.data.matchStage);
        setRoundStage(RoundStage.ROLL_DICE_STAGE);
        // check for what the match stage is and save it in the store, with whatever payload
        break;
      case MatchOpCode.PLAYER_READY:
        // TODO: send payload
        if (isMatchStageReady) socket.sendMatchState(matchData.match_id, MatchOpCode.PLAYER_READY, roundStage);
        break;
      case MatchOpCode.ROLL_DICE:
      case MatchOpCode.FACE_VALUES:
      case MatchOpCode.LEAVE_MATCH:
      default:
        return text.error.couldNotFindEvent;
    }
  };

  return {
    roundStage,
    isLoading,
  };
};
