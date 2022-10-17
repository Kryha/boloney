import { Match } from "@heroiclabs/nakama-js";
import { useCallback, useState } from "react";

import { error } from "../assets/text/error";
import { DEFAULT_POOL_MAX_PLAYERS, DEFAULT_POOL_MIN_PLAYERS, DEFAULT_POOL_QUERY, RPC_CREATE_MATCH, RPC_FIND_MATCH } from "../constants";
import { useAuthState, useMatchMakerState } from "../store";
import { MatchSettings, NkResponse } from "../types";
import { parseError } from "../util";

export const useMatchMaker = () => {
  const client = useAuthState((state) => state.client);
  const query = useMatchMakerState((state) => state.query);
  const minCount = useMatchMakerState((state) => state.minCount);
  const maxCount = useMatchMakerState((state) => state.maxCount);
  const ticket = useMatchMakerState((state) => state.ticket);
  const setTicket = useMatchMakerState((state) => state.setTicket);
  const [isLoading, setIsLoading] = useState(false);

  const matchMaker = useCallback(async () => {
    if (ticket) return;
    try {
      setIsLoading(true);
      // const socket = client.NewSocket();
      // const matchMakerTicket = await socket.AddMatchmakerAsync(query, minCount, maxCount);
      // setTicket(matchMakerTicket);
    } catch (error) {
      // TODO: add error handling
      console.log(error);
    }
    setIsLoading(false);
  }, [ticket]);

  return {
    ticket,
    isLoading,
    matchMaker,
  };
};
