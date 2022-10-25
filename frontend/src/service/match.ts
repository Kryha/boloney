import { useCallback, useState } from "react";

import { text } from "../assets/text";
import { DEFAULT_POOL_MAX_PLAYERS, DEFAULT_POOL_MIN_PLAYERS, DEFAULT_POOL_QUERY, RPC_CREATE_MATCH, RPC_FIND_MATCH } from "../constants";
import { useAuthState, useMatchMakerState } from "../store";
import { MatchJoinMetadata, MatchSettings, NkResponse } from "../types";
import { parseError } from "../util";

export const useMatchMaker = () => {
  const socket = useAuthState((state) => state.socket);
  const setTicket = useMatchMakerState((state) => state.setTicket);
  const setMatchId = useMatchMakerState((state) => state.setMatchId);
  const [isLoading, setIsLoading] = useState(false);

  const joinMatch = useCallback(
    async (matchId: string, metadata: MatchJoinMetadata): Promise<NkResponse> => {
      try {
        if (!socket) throw new Error(text.error.noSocketConnected);

        setIsLoading(true);
        setMatchId(matchId);

        await socket.joinMatch(matchId, undefined, metadata);
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [socket, setMatchId]
  );

  const joinPool = useCallback(async (): Promise<NkResponse> => {
    try {
      if (!socket) throw new Error(text.error.noSocketConnected);
      setIsLoading(true);

      const matchmakerTicket = await socket.addMatchmaker(DEFAULT_POOL_QUERY, DEFAULT_POOL_MIN_PLAYERS, DEFAULT_POOL_MAX_PLAYERS);
      setTicket(matchmakerTicket.ticket);
    } catch (error) {
      const parsedErr = await parseError(error);
      return parsedErr;
    } finally {
      setIsLoading(false);
    }
  }, [setTicket, socket]);

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

  const findMatches = useCallback(async (): Promise<NkResponse<string[]>> => {
    try {
      if (!socket) throw new Error(text.error.noSocketConnected);

      setIsLoading(true);

      const rpcRes = await socket.rpc(RPC_FIND_MATCH);
      if (!rpcRes.payload) throw new Error(text.error.noPayloadReturned);

      return JSON.parse(rpcRes.payload).match_ids;
    } catch (error) {
      const parsedErr = await parseError(error);
      return parsedErr;
    } finally {
      setIsLoading(false);
    }
  }, [socket]);

  return {
    joinPool,
    createMatch,
    findMatches,
    joinMatch,
    isLoading,
  };
};
