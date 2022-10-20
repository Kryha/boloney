import { Match } from "@heroiclabs/nakama-js";
import { useCallback, useState } from "react";

import { error } from "../assets/text/error";
import { DEFAULT_POOL_MAX_PLAYERS, DEFAULT_POOL_MIN_PLAYERS, DEFAULT_POOL_QUERY, RPC_CREATE_MATCH, RPC_FIND_MATCH } from "../constants";
import { useAuthState, useMatchMakerState } from "../store";
import { MatchSettings, NkResponse } from "../types";
import { parseError } from "../util";

export const useMatchMaker = () => {
  const socket = useAuthState((state) => state.socket);
  const setMatchId = useMatchMakerState((state) => state.setMatchId);
  const [isLoading, setIsLoading] = useState(false);

  const joinMatch = useCallback(
    async (matchId: string): Promise<NkResponse> => {
      try {
        if (!socket) throw new Error(error.noSocketConnected);

        setIsLoading(true);

        const match: Match = await socket.joinMatch(matchId);

        socket.onmatchdata = (data) => {
          // hey, maybe it's op code, maybe it's somthing else lol
          switch (data.op_code) {
            case 0: {
              // do stuff
              setPhase();
            }
          }
        };
        setMatchId(match.match_id);
        // TODO: go to game view
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [socket, setMatchId]
  );

  const joinLobby = useCallback(async (): Promise<NkResponse> => {
    try {
      if (!socket) throw new Error(error.noSocketConnected);
      setIsLoading(true);

      socket.onmatchmakermatched = async (matched) => {
        console.info("Received MatchmakerMatched message: ", matched);
        console.info("Matched opponents: ", matched.users);

        if (matched.match_id) await joinMatch(matched.match_id);
      };

      await socket.addMatchmaker(DEFAULT_POOL_QUERY, DEFAULT_POOL_MIN_PLAYERS, DEFAULT_POOL_MAX_PLAYERS);
    } catch (error) {
      const parsedErr = await parseError(error);
      return parsedErr;
    } finally {
      setIsLoading(false);
    }
  }, [joinMatch, socket]);

  const createMatch = useCallback(
    async (settings: MatchSettings): Promise<NkResponse<string | undefined>> => {
      try {
        if (!socket) throw new Error(error.noSocketConnected);

        setIsLoading(true);

        const rpcRes = await socket.rpc(RPC_CREATE_MATCH, JSON.stringify(settings));
        if (!rpcRes.payload) throw new Error(error.noPayloadReturned);

        return JSON.parse(rpcRes.payload).match_id;
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
      if (!socket) throw new Error(error.noSocketConnected);

      setIsLoading(true);

      const rpcRes = await socket.rpc(RPC_FIND_MATCH);
      if (!rpcRes.payload) throw new Error(error.noPayloadReturned);

      return JSON.parse(rpcRes.payload).match_ids;
    } catch (error) {
      const parsedErr = await parseError(error);
      return parsedErr;
    } finally {
      setIsLoading(false);
    }
  }, [socket]);

  return {
    joinLobby,
    createMatch,
    findMatches,
    joinMatch,
    isLoading,
  };
};
