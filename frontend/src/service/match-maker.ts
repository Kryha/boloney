import { Match } from "@heroiclabs/nakama-js";
import { ApiRpc } from "@heroiclabs/nakama-js/dist/api.gen";
import { useCallback, useState } from "react";
import { MatchSettings } from "../interfaces";
import { useAuthState, useMatchMakerState } from "../store";

export const useMatchMaker = () => {
  const socket = useAuthState((state) => state.socket);
  const setMatchId = useMatchMakerState((state) => state.setMatchId);
  const [isLoading, setIsLoading] = useState(false);

  const createMatch = useCallback(
    async (settings: MatchSettings): Promise<string | undefined> => {
      console.log("createMatch is called");

      if (socket === undefined) return;

      try {
        const rpcRes: ApiRpc = await socket.rpc("create_match", JSON.stringify(settings));
        if (!rpcRes.payload) return; // TODO: error handling

        return JSON.parse(rpcRes.payload).match_id;
      } catch (error) {
        //TODO: add error handling
        console.log(error);
        setIsLoading(false);
      }
    },
    [socket]
  );

  const findMatches = useCallback(async (): Promise<string[] | undefined> => {
    console.log("findMatches is called");
    if (socket === undefined) return;

    try {
      const rpcRes: ApiRpc = await socket.rpc("find_match");
      if (!rpcRes.payload) return;

      return JSON.parse(rpcRes.payload).match_ids;
    } catch (error) {
      //TODO: add error handling
      console.log(error);
    }
  }, [socket]);

  const joinMatch = useCallback(
    async (matchId: string) => {
      console.log(`joinMatch is called with matchId ${matchId}`);
      if (socket === undefined) return;

      try {
        const match: Match = await socket.joinMatch(matchId);
        setMatchId(match.match_id);
        // TODO: go to game view?
      } catch (error) {
        //TODO: add error handling
        console.log(error);
        setIsLoading(false);
      }
    },
    [socket, setMatchId]
  );

  return {
    createMatch,
    findMatches,
    joinMatch,
    isLoading,
  };
};
