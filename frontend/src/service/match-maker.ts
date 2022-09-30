import { useCallback, useState } from "react";
import { useAuthState } from "../store/auth";
import { useMatchMakerState } from "../store/match-maker";

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
  }, []);

  return {
    ticket,
    isLoading,
    matchMaker,
  };
};
