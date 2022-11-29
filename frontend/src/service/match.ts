import { useCallback, useMemo, useState } from "react";

import { text } from "../assets";
import { useStore } from "../store";
import { BidPayloadFrontend, BidWithUserId, MatchOpCode, NkResponse, PlayerPublic } from "../types";
import { parseError } from "../util";

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

  const broadcastPlaceBid = (bid: BidPayloadFrontend) => {
    // TODO: implement loading for other calls as well
    setSpinnerVisibility(true);
    sendMatchState(MatchOpCode.PLAYER_PLACE_BID, JSON.stringify(bid));
  };

  const broadcastCallExact = () => sendMatchState(MatchOpCode.PLAYER_CALL_EXACT);

  const broadcastCallBoloney = () => sendMatchState(MatchOpCode.PLAYER_CALL_BOLONEY);

  return {
    isLoading,
    sendMatchState,
    broadcastPlayerReady,
    broadcastPlaceBid,
    broadcastCallExact,
    broadcastCallBoloney,
  };
};
