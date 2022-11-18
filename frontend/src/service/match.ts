import { useCallback, useState } from "react";

import { text } from "../assets";
import { useStore } from "../store";
import { MatchOpCode, NkResponse } from "../types";
import { parseError } from "../util";
import { fakeMatchSettings } from "./fake-match-settings";

export const useMatch = () => {
  const socket = useStore((state) => state.socket);
  const matchId = useStore((state) => state.matchId);
  const setMatchSettings = useStore((state) => state.setMatchSettings);
  // TODO: each call should have it's own isLoading flag
  const [isLoading, setIsLoading] = useState(false);

  const sendMatchState = useCallback(
    async (opCode: MatchOpCode, payload?: string): Promise<NkResponse> => {
      try {
        if (!socket) throw new Error(text.error.noSocketConnected);
        if (!matchId) throw new Error(text.error.noMatchIdFound);

        setIsLoading(true);
        socket.sendMatchState(matchId, opCode, payload || "");
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [matchId, socket]
  );

  const broadcastPlayerReady = () => sendMatchState(MatchOpCode.PLAYER_READY);

  const getMatchSettings = useCallback(async (): Promise<NkResponse> => {
    try {
      if (!socket) throw new Error(text.error.noSocketConnected);
      if (!matchId) throw new Error(text.error.noMatchIdFound);

      setIsLoading(true);
      setMatchSettings(fakeMatchSettings);
    } catch (error) {
      const parsedErr = await parseError(error);
      return parsedErr;
    } finally {
      setIsLoading(false);
    }
  }, [matchId, setMatchSettings, socket]);

  return {
    isLoading,
    sendMatchState,
    broadcastPlayerReady,
    getMatchSettings,
  };
};
