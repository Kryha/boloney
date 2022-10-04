import { Match, MatchmakerTicket } from "@heroiclabs/nakama-js";
import { ApiRpc } from "@heroiclabs/nakama-js/dist/api.gen";
import { useCallback, useState } from "react";
import { useAuthState, useMatchMakerState } from "../store/";
import { useAuth } from "./auth";

export const useMatchMaker = () => {
  const socket = useAuthState((state) => state.socket);
  const isAuthenticated = useAuthState((state) => state.isAuthenticated);
  const setMatchId = useMatchMakerState((state) => state.setMatchId);
  const [isLoading, setIsLoading] = useState(false);

  const matchMaker = useCallback(async () => {
    console.log("matchMaker is called");

    try {
      if (socket === undefined) return;
      setIsLoading(true);

      //const rpcRes: ApiRpc = await socket.rpc("find_match");
      //if (!rpcRes.payload) return;
      //const matchId = JSON.parse(rpcRes.payload).match_id;
      //const match = await socket.joinMatch(matchId);
      const matchmaker: MatchmakerTicket = await socket.addMatchmaker("*", 2, 3);

      // const match: Match = await socket.createMatch();
      console.log(matchmaker);
      socket.onmatchmakermatched = (matched) => {
        console.info("Received MatchmakerMatched message: ", matched);
        console.info("Matched opponents: ", matched.users);
        setMatchId(matched.match_id);
      };
      setIsLoading(false);
    } catch (error) {
      //TODO: add error handling
      console.log(error);
      setIsLoading(false);
    }
  }, [setMatchId, socket]);

  return {
    matchMaker,
    isLoading,
  };
};
