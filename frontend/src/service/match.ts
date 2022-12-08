import { useCallback, useMemo, useState } from "react";

import { text } from "../assets";
import { useStore } from "../store";
import { BidPayloadFrontend, BidWithUserId, MatchOpCode, NkResponse, PlayerPublic } from "../types";
import { parseError } from "../util";
import { clearLocalStorage, isInMatch, setLocalStorage } from "./local-storage";

export const useTotalDiceInMatch = (): number => {
  const players = useStore((state) => state.players);

  return useMemo(() => {
    return Object.values(players).reduce((total, player) => total + player.diceAmount, 0);
  }, [players]);
};

export const useLatestBid = (): BidWithUserId | undefined => {
  const bids = useStore((state) => state.bids);

  return useMemo(() => {
    const latestBid = Object.entries(bids).reduce((prevLatest: BidWithUserId | undefined, [k, bid]) => {
      if (!prevLatest || prevLatest.createdAt < bid.createdAt) return { userId: k, ...bid };
      return prevLatest;
    }, undefined);
    return latestBid;
  }, [bids]);
};

export const useOrderedPlayers = (): PlayerPublic[] => {
  const session = useStore((state) => state.sessionState);
  const players = useStore((state) => state.players);
  const order = useStore((state) => state.playerOrder);

  return useMemo(() => {
    const playersValues = Object.values(players);

    if (!session || !session.user_id || order.length !== playersValues.length) return playersValues;

    const localPlayerIndex = order.indexOf(session.user_id);

    if (localPlayerIndex !== 0) {
      const topPart = order.splice(localPlayerIndex, order.length - 1);
      const bottomPart = order.splice(0, localPlayerIndex);
      const newPlayerArray = topPart.concat(bottomPart);
      return newPlayerArray.map((playerId) => players[playerId]);
    }
    return order.map((playerId) => players[playerId]);
  }, [order, players, session]);
};

export const usePlayer = (id: string): PlayerPublic | undefined => {
  const players = useStore((state) => state.players);

  return useMemo(() => players[id], [id, players]);
};

export const useIsInMatch = (): boolean => {
  const matchStage = useStore((state) => state.matchStage);

  return useMemo(() => matchStage !== "endOfMatchStage", [matchStage]);
};

export const useLocalPlayer = (): PlayerPublic | undefined => {
  const players = useStore((state) => state.players);
  const session = useStore((state) => state.sessionState);

  return useMemo(() => {
    if (!session || !session.user_id) return;
    return players[session.user_id];
  }, [players, session]);
};

export const useRemotePlayers = (): PlayerPublic[] => {
  const orderedPlayers = useOrderedPlayers();
  const session = useStore((state) => state.sessionState);

  return useMemo(() => {
    if (!session || !session.user_id) return orderedPlayers;
    return orderedPlayers.filter((player) => player.userId !== session.user_id);
  }, [orderedPlayers, session]);
};

export const useActivePlayer = (): PlayerPublic | undefined => {
  const players = useStore((state) => state.players);

  return useMemo(() => {
    const playersValues = Object.values(players);
    return playersValues.find((player) => player.isActive);
  }, [players]);
};

export const useMatch = () => {
  const socket = useStore((state) => state.socket);
  const matchId = useStore((state) => state.matchId);

  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);

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

  const broadcastPlaceBid = (bid: BidPayloadFrontend) => {
    setSpinnerVisibility(true);
    sendMatchState(MatchOpCode.PLAYER_PLACE_BID, JSON.stringify(bid));
  };

  const broadcastCallExact = () => {
    setSpinnerVisibility(true);
    sendMatchState(MatchOpCode.PLAYER_CALL_EXACT);
  };

  const broadcastCallBoloney = () => {
    setSpinnerVisibility(true);
    sendMatchState(MatchOpCode.PLAYER_CALL_BOLONEY);
  };

  return {
    isLoading,
    sendMatchState,
    broadcastPlayerReady,
    broadcastPlaceBid,
    broadcastCallExact,
    broadcastCallBoloney,
  };
};

// TODO: maybe split this hook in one hook for loading and another one for saving
export const useSyncState = () => {
  const sessionState = useStore((state) => state.sessionState);
  const matchId = useStore((state) => state.matchId);
  const diceValue = useStore((state) => state.diceValue);
  const matchStage = useStore((state) => state.matchStage);
  const players = useStore((state) => state.players);
  const bids = useStore((state) => state.bids);
  const playerOrder = useStore((state) => state.playerOrder);
  const matchUrl = useStore((state) => state.matchUrl);
  const powerUpIds = useStore((state) => state.powerUpIds);
  const matchSettings = useStore((state) => state.matchSettings);
  const turnActionStep = useStore((state) => state.turnActionStep);
  const action = useStore((state) => state.action);
  const hasRolledDice = useStore((state) => state.hasRolledDice);

  const loadLocalStorageToStore = useStore((state) => state.loadLocalStorageToStore);

  return useCallback(
    (matchIdFromUrl: string) => {
      if (matchId && matchIdFromUrl !== matchId) clearLocalStorage();
      if (isInMatch() && matchStage === "lobbyStage") loadLocalStorageToStore();
      else
        setLocalStorage({
          sessionState,
          matchId,
          diceValue,
          matchStage,
          players,
          bids,
          playerOrder,
          matchUrl,
          powerUpIds,
          matchSettings,
          turnActionStep,
          action,
          hasRolledDice,
        });
    },
    [
      action,
      bids,
      diceValue,
      hasRolledDice,
      loadLocalStorageToStore,
      matchId,
      matchSettings,
      matchStage,
      matchUrl,
      playerOrder,
      players,
      powerUpIds,
      sessionState,
      turnActionStep,
    ]
  );
};
