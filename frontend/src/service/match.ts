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
  PowerUp,
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

export const usePlayer = (id: string): PlayerPublic | undefined => {
  const players = useStore((state) => state.players);

  return useMemo(() => players[id], [id, players]);
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

export const useMatch = () => {
  const matchId = useStore((state) => state.matchId);
  const powerUpState = useStore((state) => state.powerUpState);

  const setSpinnerVisibility = useStore((state) => state.setSpinnerVisibility);

  const [isLoading, setIsLoading] = useState(false);

  const sendMatchState = useCallback(
    async (opCode: MatchOpCode, payload?: string): Promise<NkResponse> => {
      try {
        if (!nakama.socket) throw new Error(text.error.noSocketConnected);
        if (!matchId) throw new Error(text.error.noMatchIdFound);

        setIsLoading(true);
        nakama.socket.sendMatchState(matchId, opCode, payload || "");
      } catch (error) {
        const parsedErr = await parseError(error);
        return parsedErr;
      } finally {
        setIsLoading(false);
      }
    },
    [matchId]
  );

  const broadcastPlayerReady = () => sendMatchState(MatchOpCode.PLAYER_READY);

  const broadcastPlaceBid = (bid: BidPayloadFrontend) => {
    setSpinnerVisibility(true);
    sendMatchState(MatchOpCode.PLAYER_PLACE_BID, JSON.stringify(bid));
  };

  const broadcastHealDice = (powerUpIds: HealDicePayloadFrontend) => {
    setSpinnerVisibility(true);
    sendMatchState(MatchOpCode.PLAYER_HEAL_DICE, JSON.stringify(powerUpIds));
  };

  const broadcastCallExact = () => {
    setSpinnerVisibility(true);
    sendMatchState(MatchOpCode.PLAYER_CALL_EXACT);
  };

  const broadcastCallBoloney = () => {
    setSpinnerVisibility(true);
    sendMatchState(MatchOpCode.PLAYER_CALL_BOLONEY);
  };

  const broadcastPlayerLeft = () => sendMatchState(MatchOpCode.PLAYER_LEFT);

  /**
   * If the param is provided, the service will use the provided power-up to perform the call to the server,
   * else it will use the data present in the global state.
   */
  const broadcastUsePowerUp = async (powerUpData?: { active?: PowerUp; targetPlayerId?: string }) => {
    try {
      setSpinnerVisibility(true);

      const { active, targetPlayerId } = powerUpData || powerUpState;
      if (!active) throw new Error(text.error.noActivePowerUp);

      let payload: UsePowerUpPayloadFrontend;
      switch (active.id) {
        // TODO: handle all cases
        case "2":
          if (!targetPlayerId) throw new Error(text.error.powerUpRequiresTarget);
          payload = { id: active.id, data: { targetId: targetPlayerId } };
          break;
        case "8":
          payload = { id: active.id, data: {} };
          break;
        default:
          payload = { id: active.id, data: {} };
          throw new Error(text.error.powerUpNotImplemented);
      }

      await sendMatchState(MatchOpCode.USE_POWER_UP, JSON.stringify(payload));
    } catch (error) {
      console.warn(error);
      setSpinnerVisibility(false);
    }
  };

  const broadcastUseNonTargetPowerUp = (powerUp: PowerUp) => {
    try {
      setSpinnerVisibility(true);

      if (!powerUp) throw new Error(text.error.noActivePowerUp);

      let payload: UsePowerUpPayloadFrontend;
      switch (powerUp.id) {
        case "4":
          payload = { id: powerUp.id, data: {} };
          break;
        default:
          throw new Error(text.error.powerUpNotImplemented);
      }

      sendMatchState(MatchOpCode.USE_POWER_UP, JSON.stringify(payload));
    } catch (error) {
      console.warn(error);
      setSpinnerVisibility(false);
    }
  };

  return {
    isLoading,
    sendMatchState,
    broadcastPlayerReady,
    broadcastPlaceBid,
    broadcastCallExact,
    broadcastCallBoloney,
    broadcastPlayerLeft,
    broadcastUsePowerUp,
    broadcastUseNonTargetPowerUp,
    broadcastHealDice,
  };
};
