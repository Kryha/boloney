import { useCallback, useState } from "react";

import { text } from "../assets/text";
import { DEFAULT_POOL_MAX_PLAYERS, DEFAULT_POOL_MIN_PLAYERS, DEFAULT_POOL_QUERY, RPC_CREATE_MATCH } from "../constants";
import { useStore } from "../store";
import { MatchJoinMetadata, MatchSettings, NkResponse } from "../types";
import { parseError } from "../util";

export const useMatchMaker = () => {
  const socket = useStore((state) => state.socket);
  const setMatchId = useStore((state) => state.setMatchId);
  const [isLoading, setIsLoading] = useState(false);
  const setInitialState = useStore((state) => state.setInitialState);

  const joinMatch = useCallback(
    async (matchId: string, metadata: MatchJoinMetadata): Promise<NkResponse> => {
      try {
        if (!socket) throw new Error(text.error.noSocketConnected);

        setIsLoading(true);
        setInitialState();
        setMatchId(matchId);

        await socket.joinMatch(matchId, undefined, metadata);
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [socket, setMatchId, setInitialState]
  );

  const joinPool = useCallback(async (): Promise<NkResponse> => {
    try {
      if (!socket) throw new Error(text.error.noSocketConnected);
      setIsLoading(true);

      // This is where the player get the ticket to join the match maker pool
      await socket.addMatchmaker(DEFAULT_POOL_QUERY, DEFAULT_POOL_MIN_PLAYERS, DEFAULT_POOL_MAX_PLAYERS);
    } catch (error) {
      const parsedErr = await parseError(error);
      return parsedErr;
    } finally {
      setIsLoading(false);
    }
  }, [socket]);

  const createMatch = useCallback(
    async (settings: MatchSettings): Promise<NkResponse<string>> => {
      setIsLoading(true);
      try {
        if (!socket) throw new Error(text.error.noSocketConnected);

        const rpcRes = await socket.rpc(RPC_CREATE_MATCH, JSON.stringify(settings));
        if (!rpcRes.payload) throw new Error(text.error.noPayloadReturned);

        const parsed = JSON.parse(rpcRes.payload);
        if (!parsed.match_id) throw new Error(text.error.receivedUnexpectedPayload);

        return parsed.match_id;
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [socket]
  );

  return {
    joinPool,
    createMatch,
    joinMatch,
    isLoading,
  };
};
