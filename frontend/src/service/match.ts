import { useCallback, useMemo, useState } from "react";

import { text } from "../assets";
import { useSession, useStore } from "../store";
import {
  ActionRole,
  BidPayloadFrontend,
  BidWithUserId,
  MatchOpCode,
  NkResponse,
  PlayerPublic,
  UsePowerUpPayloadFrontend,
  HealDicePayloadFrontend,
  PowerUpId,
  UpdateHashChainFrontend,
  isNkError,
} from "../types";
import { parseError } from "../util";
import { nakama } from "./nakama";

export const useTotalDiceInMatch = (): number => {
  const players = useStore((state) => state.players);
  return Object.values(players).reduce((total, player) => total + player.diceAmount, 0);
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
  const session = useSession();
  const players = useStore((state) => state.players);
  const order = useStore((state) => state.playerOrder);

  return useMemo(() => {
    const playersValues = Object.values(players);

    if (!session || !session.user_id || order.length !== playersValues.length) return playersValues;

    const localPlayerIndex = order.indexOf(session.user_id);

    if (localPlayerIndex !== 0) {
      const topPart = [...order].splice(localPlayerIndex, order.length - 1);
      const bottomPart = [...order].splice(0, localPlayerIndex);
      const newPlayerArray = [...topPart].concat(bottomPart);
      return newPlayerArray.map((playerId) => players[playerId]);
    }
    return order.map((playerId) => players[playerId]);
  }, [order, players, session]);
};

export const usePlayer = (id?: string): PlayerPublic | undefined => {
  const players = useStore((state) => state.players);
  if (!id) return;
  return players[id];
};

export const useIsInMatch = (): boolean => {
  const matchStage = useStore((state) => state.matchStage);

  return useMemo(() => matchStage !== "endOfMatchStage", [matchStage]);
};

export const useLocalPlayer = (): PlayerPublic | undefined => {
  const session = useSession();
  const players = useStore((state) => state.players);

  return useMemo(() => {
    if (!session || !session.user_id) return;
    return players[session.user_id];
  }, [players, session]);
};

export const useArrangedPlayers = (): PlayerPublic[] => {
  const players = useRemotePlayers();
  const deadPlayers = players.filter((player) => player.status === "lost");
  const playingPlayers = players.filter((player) => player.status === "playing");

  return useMemo(() => [...deadPlayers, ...playingPlayers], [deadPlayers, playingPlayers]);
};

export const useRemotePlayers = (): PlayerPublic[] => {
  const session = useSession();
  const orderedPlayers = useOrderedPlayers();

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

export const usePlayerWithRole = (actionRole: ActionRole): PlayerPublic | undefined => {
  const players = useStore((state) => state.players);

  return useMemo(() => {
    const playersValues = Object.values(players);
    return playersValues.find((player) => player.actionRole === actionRole);
  }, [players, actionRole]);
};

export const useArePowerUpsDisabled = (): boolean => {
  const localPlayer = useLocalPlayer();

  if (!localPlayer) return false;

  if (localPlayer.powerUpsAmount < 1) return true;

  return localPlayer.arePowerUpsDisabled;
};

export const useMatch = () => {
  const matchId = useStore((state) => state.matchId);

  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);
  const setTurnActionStep = useStore((state) => state.setTurnActionStep);
  const setPlayerReady = useStore((state) => state.setPlayerReady);

  const [isLoading, setIsLoading] = useState(false);

  const sendMatchState = useCallback(
    async (opCode: MatchOpCode, payload?: string): Promise<NkResponse> => {
      try {
        if (!nakama.socket) throw new Error(text.error.noSocketConnected);
        if (!matchId) throw new Error(text.error.noMatchIdFound);

        setIsLoading(true);
        nakama.socket.sendMatchState(matchId, opCode, payload || "");
      } catch (error) {
        console.warn("Error sending match state:", error);
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [matchId]
  );

  const sendMatchStateAndShowSpinner = useCallback(
    async (opCode: MatchOpCode, payload?: string) => {
      setSpinnerVisibility(true);
      const res = await sendMatchState(opCode, payload);
      if (isNkError(res)) {
        setSpinnerVisibility(false);
      }
      return res;
    },
    [sendMatchState, setSpinnerVisibility]
  );

  const broadcastPlayerReady = () => sendMatchState(MatchOpCode.PLAYER_READY);

  const delayBroadcastPlayerReady = (delay: number) => {
    setSpinnerVisibility(true);
    setPlayerReady(true);

    const timeout = setTimeout(() => broadcastPlayerReady(), delay);
    return () => clearTimeout(timeout);
  };

  const broadcastPlaceBid = async (bid: BidPayloadFrontend) => {
    await sendMatchStateAndShowSpinner(MatchOpCode.PLAYER_PLACE_BID, JSON.stringify(bid));
    setTurnActionStep("pickAction");
  };

  const broadcastHealDice = (powerUpIds: HealDicePayloadFrontend) =>
    sendMatchStateAndShowSpinner(MatchOpCode.PLAYER_HEAL_DICE, JSON.stringify(powerUpIds));

  const broadcastCallExact = () => sendMatchStateAndShowSpinner(MatchOpCode.PLAYER_CALL_EXACT);

  const broadcastCallBoloney = () => sendMatchStateAndShowSpinner(MatchOpCode.PLAYER_CALL_BOLONEY);

  const broadcastPlayerLeft = () => sendMatchState(MatchOpCode.PLAYER_LEFT);

  const broadcastUseImmediatePowerUp = (powerUpId: PowerUpId) =>
    sendMatchStateAndShowSpinner(MatchOpCode.USE_POWER_UP, JSON.stringify({ id: powerUpId }));

  const broadcastUsePowerUp = (payload: UsePowerUpPayloadFrontend) =>
    sendMatchStateAndShowSpinner(MatchOpCode.USE_POWER_UP, JSON.stringify(payload));

  const updateHashChain = (payload: UpdateHashChainFrontend) =>
    sendMatchStateAndShowSpinner(MatchOpCode.UPDATE_HASH_CHAIN, JSON.stringify(payload));

  return {
    isLoading,
    sendMatchState,
    broadcastPlayerReady,
    delayBroadcastPlayerReady,
    broadcastPlaceBid,
    broadcastCallExact,
    broadcastCallBoloney,
    broadcastPlayerLeft,
    broadcastUseImmediatePowerUp,
    broadcastUsePowerUp,
    broadcastHealDice,
    updateHashChain,
  };
};
