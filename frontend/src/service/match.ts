// import { DiceRolls } from "./fake-dice-rolls";

import { text } from "../assets/text";
import { DEFAULT_POOL_MAX_PLAYERS, DEFAULT_POOL_MIN_PLAYERS, DEFAULT_POOL_QUERY, RPC_CREATE_MATCH, RPC_FIND_MATCH } from "../constants";
import { useAuthState, useMatchMakerState } from "../store";
import { MatchSettings, NkResponse } from "../types";
import { parseError } from "../util";

  // const getPowerUps = useCallback(async (): Promise<NkResponse> => {
  //   try {
  //     if (!socket) throw new Error(error.noSocketConnected);

  const joinMatch = useCallback(
    async (matchId: string): Promise<NkResponse> => {
      try {
        if (!socket) throw new Error(text.error.noSocketConnected);

  // const rollDice = useCallback(async (): Promise<NkResponse> => {
  //   try {
  //     if (!socket) throw new Error(error.noSocketConnected);

        const match: Match = await socket.joinMatch(matchId);
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
      if (!socket) throw new Error(text.error.noSocketConnected);
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
    // getPowerUps,
    // rollDice,
    // isLoading,
  };
};
