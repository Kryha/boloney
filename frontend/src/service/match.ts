import { useCallback, useState } from "react";
import { text } from "../assets";
import { useStore } from "../store";
import { MatchOpCode, MatchStage, NkResponse, Player } from "../types";
import { parseError } from "../util";
import { fakeDiceRolls } from "./fake-dice-rolls";

export const useMatch = () => {
  const socket = useStore((state) => state.socket);
  const matchStage = useStore((state) => state.matchStage);
  const matchId = useStore((state) => state.matchId);

  const setFaceValues = useStore((state) => state.setFaceValues);
  const [isLoading, setIsLoading] = useState(false);

  const sendMatchState = useCallback(
    async (opCode: MatchOpCode, payload?: string): Promise<NkResponse> => {
      if (!socket) throw new Error(text.error.noSocketConnected);
      if (!matchId) throw new Error(text.error.noMatchIdFound);
      try {
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

  // TODO: Add error handling
  const getOrderedPlayers = useCallback(
    (players: Record<string, Player>, playerOrder: string[]): Player[] => playerOrder.map((playerId) => players[playerId]),
    []
  );

  const getLocalPlayer = useCallback((players: Record<string, Player>, localPlayerId: string) => {
    return players[localPlayerId];
  }, []);

  const broadcastPlayerReady = () => sendMatchState(MatchOpCode.PLAYER_READY);

  const handleStageTransition = (stage: MatchStage) => {
    switch (stage) {
      case "getPowerUpStage":
        // TODO: remove fake data
        break;
      case "rollDiceStage":
        // TODO: remove fake data
        setFaceValues(fakeDiceRolls);
        break;
      case "playerTurnLoopStage":
        // TODO: add other stages
        break;
      case "roundSummaryStage":
        break;
      case "endOfMatchStage":
        break;
    }
  };

  return {
    matchStage,
    isLoading,
    sendMatchState,
    getOrderedPlayers,
    broadcastPlayerReady,
    handleStageTransition,
    getLocalPlayer,
  };
};
