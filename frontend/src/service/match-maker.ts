import { useCallback, useState } from "react";
import { useAuthState, useMatchMakerState } from "../store/";
import { useAuth } from "./auth";

export const useMatchMaker = () => {
  const socket = useAuthState((state) => state.socket);
  const isAuthenticated = useAuthState((state) => state.isAuthenticated);
  const setMatchId = useMatchMakerState((state) => state.setMatchId);
  const [isLoading, setIsLoading] = useState(false);

  const matchMaker = useCallback(async () => {
    console.log("Match maker is called");

    console.log("started match making");
    try {
      if (socket === undefined) return;
      setIsLoading(true);

      const ticket = socket && (await socket.addMatchmaker("*", 2, 4));

      console.log(ticket);
      socket.createMatch();
      socket.onmatchmakermatched = (matched) => {
        setMatchId(matched.match_id);
        console.info("Received MatchmakerMatched message: ", matched);
        console.info("Matched opponents: ", matched.users);
      };
    } catch (error) {
      //TODO: add error handling
      console.log(error);
    }
  }, [setMatchId, socket]);

  return {
    matchMaker,
    isLoading,
  };
};
